// Организация плавной прокрутки к якорям
// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[class="nav__link"]')),
  animationTime = 300,
  framesCount = 120;

anchors.forEach(function (item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function (e) {
    // убираем стандартное поведение
    e.preventDefault();

    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    // запускаем интервал, в котором
    let scroller = setInterval(function () {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
      // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});


// burger
let burgerBtn = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');
let closeBtn = document.querySelector('.nav__close');
let menuLinks = menu.querySelectorAll('.nav__link');
let menuBottom = document.querySelector('.header__list');

burgerBtn.addEventListener('click', function () {
  menu.classList.add('header__nav--active');
  menuBottom.classList.add('header__list--active');
  document.body.classList.add('stop-scroll')
})

closeBtn.addEventListener('click', function () {
  menu.classList.remove('header__nav--active');
  menuBottom.classList.remove('header__list--active');
  document.body.classList.remove('stop-scroll')
})

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    menu.classList.remove('header__nav--active');
    menuBottom.classList.remove('header__list--active');

    document.body.classList.remove('stop-scroll');
  })
})


// search line in header
let searchBtn = document.querySelector('.search__btn');
let searchInput = document.querySelector('.search__input');

searchBtn.addEventListener('click', function () {
  searchInput.classList.toggle('search__input--active');
})


// enter in header
let enterBtn = document.querySelector('.header__enter');
let enterWindow = document.querySelector('.authorization');
let enterClose = document.querySelector('.authorization__close');

enterBtn.addEventListener('click', function () {
  enterWindow.classList.add('authorization--active');
  document.body.classList.add('stop-scroll');
})

enterClose.addEventListener('click', function () {
  enterWindow.classList.remove('authorization--active');
  document.body.classList.remove('stop-scroll');
})

// button 'Что в эфире' in header
let commonBtn = document.querySelector('.header__buttons-common');
let headerBtns = document.querySelector('.header__buttons');

commonBtn.addEventListener('click', function () {
  headerBtns.classList.toggle('header__buttons--active');
  commonBtn.classList.toggle('header__buttons-common--active');
})


// buttont 'play' and 'pause' in bottom header
const buttonsSvg = document.querySelectorAll('.btn-svg');

buttonsSvg.forEach(function (el) {
  el.addEventListener('click', function () {
    el.querySelector('.svg-play').classList.toggle('svg--active');
    el.querySelector('.svg-pause').classList.toggle('svg--active');
  })
})


// button 'more' in podcasts
const btnMore = document.querySelector('.podcasts__btn');
const articlesItems = document.querySelectorAll('.podcasts__item');

btnMore.addEventListener('click', function () {
  articlesItems.forEach(function (el) {
    el.classList.add('podcasts__item--visible');
  })
  btnMore.closest('.podcasts__center').classList.add('podcasts__center--hidden');
})


// select in broadcasts
const element = document.querySelector('.select');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
  position: 'bottom'
});


// accordion in guests
const accorodion = new Accordion('.accordion-list', {
  elementClass: 'accordion',
  triggerClass: 'accordion__control',
  panelClass: 'accordion__content',
  activeClass: 'accordion--active',
  openOnInit: '0'
});


// tabs in guests
document.querySelectorAll('.names__btn').forEach(function (howBtn) {
  howBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    document.querySelectorAll('.names__btn').forEach(function (btn) {
      btn.classList.remove('names__btn--active');
    });

    e.currentTarget.classList.add('names__btn--active');

    document.querySelectorAll('.guests__info').forEach(function (howBtn) {
      howBtn.classList.remove('guests__info--active');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('guests__info--active');
  });
});


// swiper in about-us
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 20,
    },
    576: {
      spaceBetween: 30
    },
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 30
    },
    1025: {
      slidesPerGroup: 4,
      slidesPerView: 4,
      spaceBetween: 30
    },
  }
})

// validation for form
const validation = new JustValidate('.about-us__form', {
  errorLabelStyle: {
    color: '#ff5c00',
    fontSize: '12px',
  }
});

validation
  .addField('.comment', [{
    rule: 'minLength',
    value: 1,
    errorMessage: 'Вы не ввели сообщение'
  }
  ])
  .addField('.name', [{
    rule: 'minLength',
    value: 1,
    errorMessage: 'Вы не ввели имя'
  },
  {
    rule: 'maxLength',
    value: 25,
    errorMessage: 'Слишком длинное имя'
  },
  {
    rule: 'customRegexp',
    value: /[a-z, а-я]/gi,
    errorMessage: 'Ошибка'
  },
  ])
  .addField('.mail', [{
    rule: 'required',
    errorMessage: 'Вы не ввели e-mail',
  },
  {
    rule: 'email',
    errorMessage: 'Ошибка',
  }
  ])
  .addField('.checkbox', [{
    rule: 'required',
    errorMessage: 'Этот пункт необходим'
  }])
