import { Injectable } from '@nestjs/common';
import {StartProcessDto} from "./dto/StartProcessDto";
import {InjectRepository} from "@nestjs/typeorm";
import {process} from "../database/process";
import {Repository} from "typeorm";
import {step} from "../database/step";
import {PDFDocument} from 'pdf-lib';
import {user_fillingdata} from "../database/user-fillingdata";
import {step_fields} from "../database/step_fields";
import {user_process_step} from "../database/user_process_step";
import {filling_data} from "../database/filling_data";
import {async} from "rxjs";
import {user_process} from "../database/user_process";
@Injectable()
export class ProcessService {

    constructor(
            @InjectRepository(process)
            private processRepository: Repository<process>,
            @InjectRepository(step)
            private stepRepository: Repository<step>,
            @InjectRepository(user_fillingdata)
            private userFillingRepo: Repository<user_fillingdata>,
            @InjectRepository(step_fields)
            private stepFieldRepo: Repository<step_fields>,
            @InjectRepository(user_process_step)
            private userProStepRepo: Repository<user_process_step>,
            @InjectRepository(filling_data)
            private fillingRepo: Repository<filling_data>,
            @InjectRepository(user_process)
            private userProRepo: Repository<user_process>
    ) {}




    async getMissingData(startProcessDto: StartProcessDto) {
        const processID = startProcessDto.processID;
        const userID = startProcessDto.userID;

        // Abrufen des aktuellen Workflows
        const currentWorkflow = await this.processRepository.findOne({ where: { process_id: processID } });

        if (!currentWorkflow) {
            throw new Error("Workflow not found");
        }

        // Überprüfen, ob der Workflow offen ist
        if (!currentWorkflow.isOpen) {
            throw new Error("The Workflow is not open. You'll have to apply for it.");
        }

        // Erstellen eines neuen Benutzerprozesses
        const userPro = new user_process();
        userPro.processID = processID;
        userPro.state = 'missing data';
        userPro.userID = userID;
        userPro.done = false;
        await this.userProRepo.save(userPro);

        // Initialisieren der Liste für fehlende Felder
        const notDefined: step_fields[] = [];

        // Abrufen und Sortieren der Schritte
        const steps = await this.stepRepository.find({ where: { process_id: processID } });
        steps.sort((a, b) => a.stepNumber - b.stepNumber);

        // Durchlaufen der Schritte und Felder
        for (const step of steps) {
            const curFields = await this.stepFieldRepo.find({ where: { stepID: step.step_id } });
            for (const field of curFields) {
                const userField = await this.userFillingRepo.findOne({ where: { pi_id: field.dataID, userID: userID } });
                if (!userField) {
                    notDefined.push(field);
                }
            }
        }

        // Rückgabe der Liste der fehlenden Felder
        return notDefined;
    }



    async walkThroughSteps(processID: number, userID: number, up_id: number) {
        try {
            // Retrieve and sort steps
            let steps = await this.stepRepository.find({ where: { process_id: processID } });
            steps = steps.sort((a, b) => a.stepNumber - b.stepNumber);

            for (const step of steps) {
                // Load document and form
                const document = await PDFDocument.load(step.data);
                const form = document.getForm();

                // Retrieve fields for the current step
                const fields = await this.stepFieldRepo.find({ where: { stepID: step.step_id } });

                for (const field of fields) {
                    // Retrieve field data and user-filled data
                    const fData = await this.fillingRepo.findOne({ where: { data_id: field.dataID } });
                    const ufData = await this.userFillingRepo.findOne({ where: { pi_id: field.dataID, userID: userID } });

                    if (ufData) {
                        if (fData.datatype === 'text') {
                            const curTextField = form.getTextField(fData.name);
                            curTextField.setText(ufData.value);
                        } else if (fData.datatype === 'check') {
                            const curCheckbox = form.getCheckBox(fData.name);
                            if (ufData.value === 'true') curCheckbox.check();
                        } else if (fData.datatype === 'picture') {
                            // Handle picture logic here
                        }
                        console.log(ufData.value);
                    } else {
                        console.log(`No user data found for field ${fData.name}`);
                    }
                }

                // Save the modified document
                const userProStep = new user_process_step();
                userProStep.data = await document.saveAsBase64();
                userProStep.stepID = step.step_id;
                userProStep.done = true;
                userProStep.up_id = up_id;

                // Save user process step
                await this.userProStepRepo.save(userProStep);
            }
        } catch (error) {
            console.error(`Error processing steps: ${error.message}`);
        }
    }
}
