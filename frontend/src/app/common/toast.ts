export function showErrorToast(message: string) {
    const toastContainer = document.querySelector('#toast');
    toastContainer.innerHTML += alertTemplate(message, 'danger');
}

export function showSuccToast(message: string) {
    const toastContainer = document.querySelector('#toast');
    toastContainer.innerHTML += alertTemplate(message, 'success');
}

export function showErrorDialogToast(message: string) {
    const toastContainer = document.querySelector('#toast-dialog');
    toastContainer.innerHTML += alertTemplate(message, 'danger');
}

export function showInfoToast(message: string) {
   const toastContainer = document.querySelector('#toast');
   toastContainer.innerHTML += alertTemplate(message, 'info');
}

export const serverNotRespone =
    `No response from server.
     Try again later...`;

export const createdAlgorithm =
    `Your algorithm was successfuly created.
     Wait for moderator to check it.`;

function alertTemplate(message: string, style: string) {
    let template = `
        <div class="alert alert-${style} container" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            ${message}
        </div>
    `;
    return template;
}
