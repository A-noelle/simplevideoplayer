$(document).ready(function() {

    const EL_VIDEO_LIST = $('#video-list');
          EL_PLAYER = $('#player');
          EL_SEARCH_BOX = $('#search-box');
          EL_CATEGORY_LIST = $('#category-list');

//Empty array that will hold the videos retrieved from json
    let videosArr = [];


//Page load
    function init() {
        $.getJSON('json/videos.json' , function(data) {
            videosArr = data.videos;
            displayVideos(videosArr);
        });

        $.getJSON('json/categories.json' , function(data) {
            let categoriesArr = data.categories;
            displayCategories(categoriesArr);
        });

        //callback functions
        //anonymous functions



        EL_SEARCH_BOX.on('keyup' , function(event) {
            event.preventDefault();
            displayVideosByTitle($(this).val());
        });
    }



    function displayVideos(videos) {
        let string = '';
        $.each(videos, function(i, video) {
            string += getVideoHtml(video);
        });
        EL_VIDEO_LIST.html(string);
        addClickListeners();
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



    function addClickListeners() {
        $('.video-item').on('click', function() {
            let videoId = $(this).data('id');
            playVideo(videoId);
        });
    }



    function playVideo(id) {
        EL_PLAYER.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1`);
    }



    function displayVideosByTitle(title) {
        let filteredVideos = [];
        $.each(videosArr, function(i, video) {
           if (video.title.includes(title)) {
                filteredVideos.push(video);
           }
        });
        displayVideos(filteredVideos);
    }



    function displayCategories(categoriesArr) {
        let string = '';
        $.each(categoriesArr, function(i, category) {
            string += getCategoryHtml(category);
        });
        EL_CATEGORY_LIST.html(string);
    }



    function getCategoryHtml(category) {
        return `<li><h4>${category.title}</h4></li>`
    }


    
    init();

})