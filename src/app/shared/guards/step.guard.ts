import {CanActivateFn, Router} from '@angular/router';
import {StepValidationService} from '../services/step-validation.service';
import {inject} from '@angular/core';

export const stepGuard: CanActivateFn = (route, state) => {
  const stepService = inject(StepValidationService);
  const router = inject(Router);

  const currentStep = route.routeConfig?.path as string;

  // ordre des steps
  const stepsOrder = ['info', 'plan', 'addons', 'summary', 'thank-you'];

  const currentIndex = stepsOrder.indexOf(currentStep);

  // si c'est le premier step, toujours autorisé
  if (currentIndex === 0) return true;

  // sinon vérifier que le précédent est validé
  const previousStep = stepsOrder[currentIndex - 1];
  if (stepService.isStepValid(previousStep)) {
    return true;
  } else {
    router.navigate(['/' + previousStep]);
    return false;
  }
};
