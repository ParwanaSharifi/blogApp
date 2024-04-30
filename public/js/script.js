//uploding images
document.addEventListener('DOMContentLoaded', function () {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');

    imageUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });
});

//edit post codes
function previewImage(event) {
    const imagePreview = document.querySelector('.currentImage');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('postBlogForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            var notification = document.getElementById('notification');
            notification.classList.add('show');
            setTimeout(function () {
                console.log("hello")
                form.submit();
            }, 1000); // Adjust the delay time as needed
        });
    }
});



document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('postEditForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            var notification = document.getElementById('notificationEdit');
            notification.classList.add('show');
            setTimeout(function () {
                notification.classList.remove('show');
                setTimeout(function () {
                    form.submit();
                }, 1000); // Adjust the delay time as needed
            }, 2000);
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('deleteForm');
    if (form) {
        form.addEventListener('submit', function () {
            var notification = document.getElementById('notificationDelete');
            notification.classList.add('show');
            setTimeout(function () {
                notification.classList.remove('show');
                setTimeout(function () {
                    form.submit();
                }, 1000); // Adjust the delay time as needed
            }, 2000);
        });
    }
});
