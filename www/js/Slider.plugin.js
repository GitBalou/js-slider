(function(){

    function Plugin(){};

    function Slider(){};

    Plugin.prototype.init = function(elementId, images, params){

        // paramètres optionnels
        var params = Object.assign(
            {
                delay : 4000,
                height : 400,
                width: 400
            },
            params
        );

        console.log(params);
        // nouvelle instance
        var slider = new Slider();

        // configuration
        slider.elementId = elementId;
        slider.delay = params.delay;
        slider.imgHeight = params.height;
        slider.imgWidth = params.width;
        slider.containerHeight = slider.imgHeight + 100;
        slider.containerWidth = slider.imgWidth;

        // images
        slider.images = images;
        slider.cursor = 0;

        // création de l'interface
        createIHM(slider);

        // affichage de la première image
        fctRefresh(slider);
    };

    // méthodes privées
    function createIHM(instance) {

        // container
        instance.container = document.querySelector('#'+instance.elementId);
        instance.container.className = 'slider';
        instance.container.style.height = instance.containerHeight;
        instance.container.style.width = instance.containerWidth;

        var image = document.createElement('img');
        image.className = 'slider-img';
        image.style.height = instance.imgHeight+'px';
        image.style.maxWidth = instance.imgWidth+'px';
        image.style.width = 'auto';


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
    };

    function fctNext(instance) {

        instance.cursor ++;

        if(  instance.cursor ==  instance.images.length)
            instance.cursor = 0;
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