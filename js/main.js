$(document).ready(function () {

    const EL_VIDEO_LIST = $('#video-list');
    EL_PLAYER = $('#player');
    EL_SEARCH_BOX = $('#search-box');
    EL_CATEGORY_LIST = $('#category-list');
    EL_SCREEN_LINKS = $('.screen-link');
    EL_SCREENS = $('.screen');

    //Empty array that will hold the videos retrieved from json
    let videosArr = [];



    function init() {

        // Getting data from json files
        $.getJSON('json/videos.json', function (data) {
            videosArr = data.videos;
            displayVideos(videosArr);
        });

        $.getJSON('json/categories.json', function (data) {
            let categoriesArr = data.categories;
            displayCategories(categoriesArr);
        });

        // Search box // which method - which key has been pressed
        // Unicode for return key - carriage return CR = 13
        EL_SEARCH_BOX.on('keyup', function (event) {
            event.preventDefault();

            if (event.which === 13) {
                let video = getVideoById($(this).val())

                if (video) {
                    displayVideos([video]); // making the video object to an array instead
                } else {
                    displayVideosByTitle($(this).val());
                }
            }
        });

        // Switch screen function to work in the HTML
        EL_SCREEN_LINKS.on('click', switchScreens);
        EL_SCREENS.slice(1).hide();
    };


    // Displaying videos
    function displayVideos(videos) {
        let string = '';
        $.each(videos, function (i, video) {
            string += getVideoHtml(video);
        });
        EL_VIDEO_LIST.html(string);
        addVideoListeners();
    }

    function getVideoHtml(video) {
        return `<div class='video-item' data-id='${video.id}'>
            <div>
            <img src='https://img.youtube.com/vi/${video.id}/default.jpg' alt='video-thumbnail'>
            </div>
            <div>
                <h3>${video.title}</h3>
                <p>${video.category}</p>
            </div>
        </div>`
    }

    // Displaying videos by categories
    function displayCategories(categoriesArr) {
        let string = '';
        $.each(categoriesArr, function (i, category) {
            string += getCategoryHtml(category);
        });
        EL_CATEGORY_LIST.html(string);
        addCategoryListeners();
    }

    function getCategoryHtml(category) {
        return `<li class="category-item" data-category="${category.slug}"><h4>${category.title}</h4></li>`
    }


    // Clicking on the video to play
    function addVideoListeners() {
        $('.video-item').on('click', function () {
            let videoId = $(this).data('id');
            playVideo(videoId);
        });
    }

    function addCategoryListeners() {
        $('.category-item').on('click', function () {
            let category = $(this).data('category');
            displayVideosByCategory(category);
        });
    }


    // Youtube embed
    function playVideo(id) {
        EL_PLAYER.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1`);
    }


    // Looping through all videos by title
    function displayVideosByTitle(title) {
        let filteredVideos = [];
        $.each(videosArr, function (i, video) {
            if (video.title.includes(title)) {
                filteredVideos.push(video);
            }
        });
        displayVideos(filteredVideos);
    }

    // Looping through all videos by categories
    function displayVideosByCategory(category) {
        let filteredVideos = [];
        $.each(videosArr, function (i, video) {
            if (category === video.category) {
                filteredVideos.push(video);
            }
        });
        displayVideos(filteredVideos);
    }


    //input is the what you put in the input field that becomes a string
    function getVideoById(input) {
        for (let i = 0; i < videosArr.length; i++) {
            if (input === videosArr[i].id) {
                return videosArr[i];
            }
        }
        return null;
    }

    //Switch screens
    function switchScreens() {
        EL_SCREENS.hide();

        $('#' + $(this).data('screen')).show();
    }

    init();

});