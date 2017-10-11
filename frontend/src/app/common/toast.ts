export function showErrorToast(message: string) {
    const toastContainer = document.querySelector('#toast');
    toastContainer.innerHTML += dangerAlertTemplate(message);
}

export function showSuccToast(message: string) {
    const toastContainer = document.querySelector('#toast');
    toastContainer.innerHTML += succAlertTemplate(message);
}

export const serverNotRespone =
    `Server is not response.
     Try again later...`;

export const createdAlgorithm =
    `Your algorithm was successfuly created.
     Wait for moderator to check it.`;

function dangerAlertTemplate(message: string) {
    let template = `
        <div class="alert alert-danger container" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            ${message}
        </div>
    `;
    return template;
}

function succAlertTemplate(message: string) {
    let template = `
        <div class="alert alert-success container" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            ${message}
        </div>
    `;
    return template;
}
