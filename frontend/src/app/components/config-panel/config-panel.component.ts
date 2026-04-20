import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { ApiConfig, ApiType, GEMINI_MODELS, OPENAI_MODELS } from '../../models';

@Component({
  selector: 'app-config-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './config-panel.component.html',
  styleUrl: './config-panel.component.scss'
})
export class ConfigPanelComponent implements OnInit, OnDestroy {
  @Output() configChanged = new EventEmitter<ApiConfig>();

  configForm!: FormGroup;
  availableModels = OPENAI_MODELS;

  readonly openaiModels = OPENAI_MODELS;
  readonly geminiModels = GEMINI_MODELS;

  private subs = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.configForm = this.fb.group({
      apiType: ['openai'],
      model: [OPENAI_MODELS[0].value],
      apiKey: ['']
    });

    // Emit initial config
    this.emitConfig();

    // React to apiType changes — update model list and reset model
    const apiTypeSub = this.configForm.get('apiType')!.valueChanges.subscribe((apiType: ApiType) => {
      this.availableModels = apiType === 'openai' ? OPENAI_MODELS : GEMINI_MODELS;
      this.configForm.patchValue({ model: this.availableModels[0].value }, { emitEvent: false });
      this.emitConfig();
    });

    // React to any form value changes
    const formSub = this.configForm.valueChanges.subscribe(() => {
      this.emitConfig();
    });

    this.subs.add(apiTypeSub);
    this.subs.add(formSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private emitConfig(): void {
    const { apiType, model, apiKey } = this.configForm.value;
    this.configChanged.emit({ apiType, model, apiKey: apiKey || '' });
  }
}
