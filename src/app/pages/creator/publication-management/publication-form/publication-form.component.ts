import { Component, OnInit, inject  } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ApiImgPipe } from '../../../../core/pipes/api-img.pipe';
import { PublicationService } from '../../../../core/services/publication.service';
import { MediaService } from '../../../../core/services/media.service';
import { CategoryService } from '../../../../core/services/category.service';
import { AuthService } from '../../../../core/services/auth.service';

import { CategoryResponse } from '../../../../shared/models/category-response.model';
import { PublicationDetailsResponse } from '../../../../shared/models/publication-details-response.model';
import { PublicationCreateRequest } from '../../../../shared/models/publication-create-update-request.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrl: './publication-form.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ApiImgPipe,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    NgForOf,
    NgIf,
  ],

})
export default class PublicationFormComponent {
  private publicationService = inject(PublicationService);
  private mediaService = inject(MediaService);
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  categories: CategoryResponse[] = [];
  errors: string[] = [];
  publicationId?: number;
  visibilityOptions = ['ALL', 'STANDARD', 'PREMIUM'];

  form: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(250)],
    ],
    content: ['', [Validators.required]],
    video_url: ['', [Validators.pattern(('https?://.+'))]],
    visibility: ['', [Validators.required]],
    category_id: ['', Validators.required],
    creator_id: ['', Validators.required],
    filePath: [
      '',
      [Validators.required, Validators.pattern(/.+\.jpg|.jpeg|.png|.gif|.bmp$/)],
    ],
  });

  ngOnInit(): void {
    this.publicationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategories();
    this.loadCreatorId();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        if (this.publicationId) this.loadPublicationForEdit();
      },
      error: () => this.errors.push('Error al cargar las categorías.'),
    });
  }

  private loadPublicationForEdit(): void {

  }

  private loadCreatorId(): void {
    const userId = this.authService.getUser()?.id; // Puedes obtener esto de otra forma si no quieres usar `getUser`

    if (userId) {
      this.authService.getCreatorId(userId).subscribe({
        next: (creatorId) => {
          this.form.patchValue({ creator_id: creatorId });
        },
        error: (error) => {
          console.error('Error al obtener el Creator ID:', error);
          this.snackBar.open('Error al obtener el Creator ID', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  uploadFile(event: Event, control: string): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.mediaService.upload(formData).subscribe({
        next: (response) => this.form.controls[control].setValue(response.path),
        error: () => this.errors.push('Error al cargar el archivo.'),
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: PublicationCreateRequest = { ...this.form.value };

    if (!formData.video_url || formData.video_url.trim() === '') {
      delete (formData as { video_url?: string }).video_url;
    }

    const request: Observable<PublicationDetailsResponse> = this.publicationId
      ? this.publicationService.updatePublication(this.publicationId, formData)
      : this.publicationService.createPublication(formData);

    request.subscribe({
      next: () => {
        this.snackBar.open('Publicación guardada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/creator/publications/list']);
      },
      error: (error) => {
        this.errors = error.error.errors || ['Error al guardar la publicación'];
        this.snackBar.open('Error al guardar la publicación', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }



}
