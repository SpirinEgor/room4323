export function showErrorToast(message: string) {
    const toastContainer = document.querySelector('#toast');
    toastContainer.innerHTML += dangerAlertTemplate(message);
}

export const serverNotRespone =
    `Server is not response.
     Try again later...`;

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
