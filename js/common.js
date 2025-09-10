/* 슬라이드 */
$('.swiper-group').each(function (t) {
	$(this).find('.swiper, .swiper-pagination').addClass('type' + t);
	const isLiveWrap = $(this).hasClass('live_wrap');
	const slideCount = $(this).find('.swiper-slide').length;
	const swiper = new Swiper('.swiper.type' + t, {
		slidesPerView: 'auto',
		spaceBetween: (t === 0) ? 10 : 18,
		observer: true,
		observeParents: true,
		loop: false,
		initialSlide: 0,
		centeredSlides: slideCount === 1,
		centeredSlidesBounds: slideCount === 1,
		loop: isLiveWrap ? true : false,
		autoplay: isLiveWrap ? {
			delay: 4000,
			disableOnInteraction: false,
		} : false,
		pagination: {
			el: '.swiper-pagination.type' + t,
			clickable: true,
		},
		on: {
			slideChangeTransitionEnd: function AniSlide() {
				const activeSlide = $('.swiper.type' + t).find('.swiper-slide').eq(this.activeIndex);
				const listItems = activeSlide.find('.box_wrap li');

				listItems.removeClass('point');
				listItems.removeClass('animate-in animated');
				listItems.each(function (i, el) {
					const $el = $(el);
					setTimeout(() => {
						$el.addClass('animate-in');
						setTimeout(() => {
							$el.removeClass('animate-in').addClass('animated');
						}, 500);
					}, i * 300);
				});

				const totalDuration = listItems.length * 300 + 500;

				setTimeout(() => {
					const activeLi = listItems.filter('.active');
					activeLi.addClass('bounce');
					setTimeout(() => {
						activeLi.removeClass('bounce').addClass('point');
					}, 500);
				}, totalDuration);
			}
		}
	});
});

/* 메인 말풍선 슬라이드 */
const swiper = new Swiper('.bubble_swiper.swiper', {
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	loop: true,
	autoplay: {
		delay: 1500,
	},
	speed: 700,
	slidesPerView: 'auto',
	spaceBetween: 20,
	autoHeight: true,
});

/* 상품 상세 슬라이드 */
const swiper2 = new Swiper('.porduct_swiper.swiper', {
	slidesPerView: 1,
	loop: true,
	spaceBetween: 20,
	pagination: {
		el: '.swiper_pagination',
		clickable: true,
		type: 'fraction',
	},
});

/* 홈 상품 슬라이드 */
const swiper3 = new Swiper('.porduct_list_swiper.swiper', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	observer: true,
	observeParents: true,
	loop: false,
	initialSlide: 0,
	/* centeredSlides: slideCount === 1,
	centeredSlidesBounds: slideCount === 1, */
	loop: false,
	autoplay: false,
});

/* tab */
$(".tab_wrap .tab").click(function () {
	$(".tab_wrap .tab").removeClass("active");
	$(this).addClass("active");
});

$(".sub_tab_wrap .tab").click(function () {
	$(".sub_tab_wrap .tab").removeClass("active");
	$(this).addClass("active");
});

/* nav bar*/
$('nav li').click(function () {
	$('nav li a').removeClass('active');
	$(this).find('a').addClass('active');
});

/* 요금제 선택하기 */
$('.question_box .box_wrap button').click(function () {
	$('.box').removeClass('active');
	$(this).parents('.box').addClass('active');
});

/* 기종 선택 */
$('.filter_btn, .details_btn').click(function () {
	$('.modal_wrap').css('display', 'flex');
});

$('.modal_wrap, .sel_btn, .no_btn, .modal_close_btn').click(function () {
	$('.modal_wrap').css('display', 'none');
});

$('.pop, .modal, .modal2').click(function (e) {
	e.stopPropagation();
});

/* 찜하기*/
$('.like').click(function () {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).siblings('.heart').removeClass('heartpop');
		$(this).attr('aria-label', '찜하기');
	} else {
		$(this).addClass('active');
		$(this).siblings('.heart').addClass('heartpop');
		$(this).attr('aria-label', '찜하기 완료, 찜하게 해제');
	}
});

/* resize */
$(document).ready(function () {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	$(window).on('resize', function () {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
});

/* range_bar */
const values = [5, 50, 100, 200, 300];
const values2 = [50, 100, 200, 300, 500, 800];

function updateLabel(value) {
	$('#rangeLabel').text(values[value] + ' GB');
}

function updateLabel2(value) {
	$('#rangeLabel2').text(values2[value] + '분');
}

function updateLabel3(value) {
	$('#rangeLabel3').text(values2[value] + '건');
}

updateLabel($('#dataRange').val());
updateLabel2($('#dataRange2').val());
updateLabel3($('#dataRange3').val());

$('#dataRange').on('input change', function () {
	updateLabel($(this).val());
});

$('#dataRange2').on('input change', function () {
	updateLabel2($(this).val());
});

/* 드롭 다운 열고 닫기 */
$('.box3 .btn').click(function () {
	$(this).find('button').toggleClass('active');
	$(this).siblings('.info_box').stop().slideToggle('500');
});

$('.dropdown_btn').click(function () {
	$(this).find('img').toggleClass('active');
	$(this).parent('.agree_wrap').siblings('.info_box').stop().slideToggle('500');
	$(this).parents('.info_wrap').find('.info_box2').stop().slideToggle('500');
});

/* 통신사 이용약관 동의 탭 */
$('.tab_wrap > button').click(function () {
	$('.tab_wrap > button').removeClass("active");
	$(this).addClass("active");
	$('.tabcontent').hide();
	$('.tabcontent').eq($(this).index()).show();
});
$('.tab_wrap > button').eq(0).trigger("click");

/* 전체동의 체크 시 모든 체크박스 체크/해제 */
$('.agree_wrap #checkbox').on('change', function () {
	const isChecked = $(this).is(':checked');
	$('.info_box input[type="checkbox"]').prop('checked', isChecked);
});

/* 개별 체크박스 변경 시 전체동의 상태 업데이트 */
$('.info_box input[type="checkbox"]').on('change', function () {
	const allChecked = $('.info_box input[type="checkbox"]').length === $('.info_box input[type="checkbox"]:checked').length;
	$('.agree_wrap #checkbox').prop('checked', allChecked);
});

/* 상품 정보 펼쳐보기 및 접기 */
$('.open_btn').click(function () {
	$(this).toggleClass('active');
	if ($(this).hasClass('active')) {
		$('.hidden').css('height', 'auto');
		$(this).text('상품 정보 접기');
	} else {
		$('.hidden').css('height', '360px');
		$(this).text('상품 정보 펼쳐보기');
	}
});

/* 툴팁 */
$('.question_btn').click(function () {
	$(this).siblings($('.question')).css('display', 'block');
});

$('.wrap, .close_btn').click(function () {
	$('.question').css('display', 'none');
});

$('.question_wrap').click(function (e) {
	e.stopPropagation();
});

/* 별점 클릭 */
$(document).on('click', '.review_select_wrap .star_wrap span', function () {
	const star = $(this).index() + 1; // 1~5점
	$(".review_select_wrap .star_wrap span").removeClass('star_on').addClass('star_off');
	$(".review_select_wrap .star_wrap span").slice(0, star).removeClass('star_off').addClass('star_on');

	$(".select_value").addClass("active").text(`${star}점`);
});

/* 알림 상세 타이틀 높이 값 */
function onResize() {
	$(".notification_cont").css("padding-top", $(".notification_title").outerHeight() + 16 + "px");
}

$(window).resize(onResize).trigger("resize");

/* 모달 동의 체크 시 버튼 활성화 */
$('.modal2 #checkbox').on('change', function () {
	if ($(this).is(':checked')) {
		$('.yes_btn').removeAttr('disabled');
		$('.comfirm ,.check').addClass('active');
	} else {
		$('.yes_btn').attr('disabled', true);
		$('.comfirm ,.check').removeClass('active');
	}
});

/* 날짜 선택 라이브러리 */
$('#dateInput, #dateInput2').daterangepicker({
	singleDatePicker: true,
	alwaysShowCalendars: true,
	showCustomRangeLabel: false,
	autoApply: true,
	locale: {
		format: 'YYYY-MM-DD',
		daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	}
});