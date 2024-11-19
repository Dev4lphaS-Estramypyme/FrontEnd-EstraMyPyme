import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { Question } from '../../models/question'; // Asegúrate de tener un modelo para las preguntas
import { Test } from '../../models/test'; // Asegúrate de tener un modelo para los tests

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  questions: Question[] = [];
  currentStep = 1;
  totalSteps = 3;

  constructor(private fb: FormBuilder, private testService: TestService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      section1: this.fb.group({
        field1: ['', Validators.required],
        field2: ['', Validators.required],
        field3: ['', Validators.required]
      }),
      section2: this.fb.group({
        field4: ['', Validators.required],
        field5: ['', Validators.required],
        field6: ['', Validators.required],
      }),
      section3: this.fb.group({
        field7: ['', Validators.required],
        field8: ['', Validators.required],
        field9: ['', Validators.required],
      }),
    });

    const testId = '1'; // Reemplaza con el ID del test correspondiente
    this.testService.getQuestionsByTestId(testId).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.initializeForm();
      },
      error: (error) => {
        console.error('Error fetching questions', error);
      }
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      section1: this.fb.group({
        field1: [{ value: this.questions[0]?.question, disabled: true }, Validators.required],
        field2: [{ value: this.questions[1]?.question, disabled: true }, Validators.required],
        field3: [{ value: this.questions[2]?.question, disabled: true }, Validators.required]
      }),
      section2: this.fb.group({
        field4: [{ value: this.questions[3]?.question, disabled: true }, Validators.required],
        field5: [{ value: this.questions[4]?.question, disabled: true }, Validators.required],
        field6: [{ value: this.questions[5]?.question, disabled: true }, Validators.required],
      }),
      section3: this.fb.group({
        field7: [{ value: this.questions[6]?.question, disabled: true }, Validators.required],
        field8: [{ value: this.questions[7]?.question, disabled: true }, Validators.required],
        field9: [{ value: this.questions[8]?.question, disabled: true }, Validators.required],
      }),
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm() {
    if (this.form.valid) {
      const testDetails: Test = {
        id_empresa: '1', // Reemplaza con el ID de la empresa correspondiente
        pregunta1: this.form.get('section1.field1')!.value,
        pregunta2: this.form.get('section1.field2')!.value,
        pregunta3: this.form.get('section1.field3')!.value,
        pregunta4: this.form.get('section2.field4')!.value,
        pregunta5: this.form.get('section2.field5')!.value,
        pregunta6: this.form.get('section2.field6')!.value,
        pregunta7: this.form.get('section3.field7')!.value,
        pregunta8: this.form.get('section3.field8')!.value,
        pregunta9: this.form.get('section3.field9')!.value,
      };

      // Enviar las respuestas al backend
      const answers = [
        { testId: testDetails.id_empresa, questionId: this.questions[0].id, answer: testDetails.pregunta1 },
        { testId: testDetails.id_empresa, questionId: this.questions[1].id, answer: testDetails.pregunta2 },
        { testId: testDetails.id_empresa, questionId: this.questions[2].id, answer: testDetails.pregunta3 },
        { testId: testDetails.id_empresa, questionId: this.questions[3].id, answer: testDetails.pregunta4 },
        { testId: testDetails.id_empresa, questionId: this.questions[4].id, answer: testDetails.pregunta5 },
        { testId: testDetails.id_empresa, questionId: this.questions[5].id, answer: testDetails.pregunta6 },
        { testId: testDetails.id_empresa, questionId: this.questions[6].id, answer: testDetails.pregunta7 },
        { testId: testDetails.id_empresa, questionId: this.questions[7].id, answer: testDetails.pregunta8 },
        { testId: testDetails.id_empresa, questionId: this.questions[8].id, answer: testDetails.pregunta9 },
      ];

      answers.forEach(answer => {
        this.testService.createAnswer(answer).subscribe({
          next: () => {
            // Maneja la respuesta exitosa aquí
          },
          error: (error) => {
            console.error('Error submitting answer', error);
          }
        });
      });

      this.testService.registerTest(testDetails).subscribe({
        next: () => {
          // Maneja la respuesta exitosa aquí
        },
        error: (error) => {
          console.error('Error submitting test', error);
        }
      });
    }
  }
}