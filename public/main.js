function onsubmit(e) {
    e.preventDefault()
    document.querySelector('.err-msg').textContent = ""
    document.querySelector('#image').src = ''

    const txtToGenereate = document.querySelector('#img-text').value;

    generateImageReq(txtToGenereate);
}

async function generateImageReq(txt){
    try {
        showHideLoader(true)
        const res = await fetch('/openai/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: txt
            })
        });

        if (!res.ok) {
            showHideLoader(false)
            throw new Error('An error occured, try again')
        }

        const data = await res.json()
        showHideLoader(false)

        const imgUrl = data.image
        document.querySelector('#image').src = imgUrl;
        showHideLoader(false)
    } catch (error) {
        showHideLoader(false)
        document.querySelector('.err-msg').textContent = error
    }
}
function showHideLoader(show){
    show ? document.querySelector('#loader').classList.add('loader') : document.querySelector('#loader').classList.remove('loader')
}

document.querySelector('#img-form').addEventListener('submit', onsubmit)