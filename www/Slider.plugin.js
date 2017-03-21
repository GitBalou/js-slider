(function(){

    function Plugin(){};

    function Slider(){};

    Plugin.prototype.init = function(elementId, images, delay){
        var slider = new Slider();

        slider.container = document.querySelector('#'+elementId);
        slider.images = images;
        slider.delay = delay;
        slider.cursor = 0;

        createIHM(slider);

        fctRefresh(slider);
    };

    // méthodes privées
    function createIHM(instance) {

        // template html
        instance.container.className = 'slider';

        var image = document.createElement('img');
        image.className = 'slider-img';

        var commandes = document.createElement('p');
        commandes.className = 'slider-cmd';

        var play = fctCreateButton(commandes, 'play', fctPlay, instance);
        var pause = fctCreateButton(commandes, 'pause', fctPause, instance);
        var prev = fctCreateButton(commandes, 'prev', fctPrev, instance);
        var next = fctCreateButton(commandes, 'next', fctNext, instance);
        var random = fctCreateButton(commandes, 'random', fctRandom, instance);

        instance.container.append(image);
        instance.container.append(commandes);
    }

    function fctCreateButton(parent, intitule, onclick, instance) {
        var btn = document.createElement('button');
        btn.className = 'slider-btn';
        btn.innerText = intitule;
        btn.onclick = onclick.bind(this, instance);
        parent.appendChild(btn);
    };

    function fctRefresh(instance){
        instance.container.querySelector('img').src = instance.images[ instance.cursor];
        console.log(instance.images[ instance.cursor]);
    };

    function fctNext(instance) {

        instance.cursor ++;

        if(  instance.cursor ==  instance.images.length)
            instance.cursor = 0;
        console.log(instance.cursor);
        fctRefresh( instance);
    };

    function fctPrev(instance){

        instance.cursor--;

        if(  instance.cursor < 0)
            instance.cursor =  instance.images.length - 1;

        fctRefresh( instance);
    };

    function fctPlay( instance){
        fctPause(instance);

        instance.interval = setInterval(fctNext.bind(this, instance),  instance.delay);
    };

    function fctPause( instance){
        clearInterval( instance.interval);
    };

    function fctRandom( instance){

        var newCursor = 0;

        do {
            newCursor = Math.floor(Math.random() * ( instance.images.length));
        }while( instance.cursor == newCursor);

        instance.cursor = newCursor;
        fctRefresh( instance);
    };

    // affectation du plugin à window
    this.SliderPlugin = new Plugin();

})();