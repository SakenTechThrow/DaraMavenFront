import { HttpErrorResponse } from "@angular/common/http";

export function getErrorMessage(
    error: unknown,
    defaultMessage: string = 'Something went wrong'
): string {
    if(!(error instanceof HttpErrorResponse)){
        return defaultMessage;
    }
    if(typeof error.error === 'string' && error.error.trim()){
        return error.error;
    }
    if(error.error?.message) {
        return error.error.message;
    }
    if(error.error?.error){
        return error.error.error;
    }
    if(error.error?.detail){
        return error.error.detail;
    }
    if(error.error?.title){
        return error.error.title;
    }
    if(error.status === 0){
        return 'Could not connect to the server. Please check if backend is running.';
    }
    if(error.status === 401){
        return 'You are not authenticated. Please log in again.';
    }
    if(error.status === 404){
        return 'Requested resource was not found.';
    }
    if(error.status === 403){
        return 'You do not have permission to perform this action.';
    }
    if(error.status === 500){
        return 'Server error. Please try again later.';
    }
    if(error.message){
        return error.message;
    }
    return defaultMessage;
}