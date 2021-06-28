import { GoqZipCode } from './index';

import * as app from './types';

const goqZipCode = new GoqZipCode();

// 郵便番号から住所を検索（完全一致）
const $zip1 = document.getElementById('zip1') as HTMLInputElement;
$zip1.addEventListener('input', async (event) => {
  const target = event.target as HTMLInputElement;
  const data = await goqZipCode
    .searchAddressFromZipcode({
      zipcode: String(target.value),
      is_exact: true,
    })
    .catch((err) => {
      return [];
    });

  const value = data.map(
    (item: app.response) => `${item.pref}${item.city}${item.town}`
  );

  const $result = document.getElementById('js-result1') as HTMLInputElement;
  $result.value = value[0] || '入力した郵便番号に一致する住所が見つかりません';
});

// 郵便番号から住所を検索（前方一致）
const $zip2 = document.getElementById('zip2') as HTMLInputElement;
const $dropdown2 = document.getElementById('dropdown2') as HTMLElement;
const $result2 = document.getElementById('js-result2') as HTMLInputElement;

const hideDropdown2 = () => {
  $dropdown2.innerText = '';
};

$zip2.addEventListener('input', async (event) => {
  const target = event.target as HTMLInputElement;
  const data = await goqZipCode
    .searchAddressFromZipcode({
      zipcode: String(target.value),
    })
    .catch((err) => {
      return [];
    });

  const template = data
    .map(
      (item: app.response) =>
        `<li><button type="button" class="js-dropdownButton goqzip-dropdown__button">〒${item.zipcode} （${item.pref}${item.city}${item.town}）</button></li>`
    )
    .join('');
  $dropdown2.innerHTML = template
    ? `<ul class="goqzip-dropdown__list">${template}</ul>`
    : '';

  const $dropdownButton = document.querySelectorAll('.js-dropdownButton');
  $dropdownButton.forEach((x, index) => {
    x.addEventListener('click', () => {
      const target = data[index];
      $zip2.value = target.zipcode;
      $result2.value = `${target.pref}${target.city}${target.town}`;
    });
  });

  document.addEventListener('click', hideDropdown2, { once: true });
});

// 住所から郵便番号を検索（住所で一致したもの）
const $address1 = document.getElementById('address1');
$address1?.addEventListener('input', async (event) => {
  const target = event.target as HTMLInputElement;
  const data = await goqZipCode
    .searchZipcodeFromAddress({
      address: String(target?.value),
      is_exact: true,
    })
    .catch((err) => {
      return [];
    });

  const value = data.map((item: app.response) => `${item.zipcode}`);

  const $result = document.getElementById('js-result3') as HTMLInputElement;
  $result.value = value[0] || '入力した住所に一致する郵便番号が見つかりません';
});

// 住所から郵便番号を検索（前方一致）
const $address2 = document.getElementById('address2') as HTMLInputElement;
const $dropdown4 = document.getElementById('dropdown4') as HTMLElement;
const $result4 = document.getElementById('js-result4') as HTMLInputElement;

const hideDropdown4 = () => {
  $dropdown4.innerText = '';
};

$address2.addEventListener('input', async (event) => {
  const target = event.target as HTMLInputElement;
  const data = await goqZipCode
    .searchZipcodeFromAddress({
      address: String(target.value),
      is_left: true,
    })
    .catch((err) => {
      return [];
    });

  const template = data
    .map(
      (item: app.response) =>
        `<li><button type="button" class="js-dropdownButton goqzip-dropdown__button">〒${item.zipcode}（${item.pref}${item.city}${item.town}）</button></li>`
    )
    .join('');

  $dropdown4.innerHTML = template
    ? `<ul class="goqzip-dropdown__list">${template}</ul>`
    : '';

  const $dropdownButton = document.querySelectorAll('.js-dropdownButton');
  $dropdownButton.forEach((x, index) => {
    x.addEventListener('click', () => {
      const target = data[index];
      $address2.value = `${target.pref}${target.city}${target.town}`;
      $result4.value = target.zipcode;
    });
  });

  document.addEventListener('click', hideDropdown4, { once: true });
});

// 住所から郵便番号を検索（部分一致）
const $address3 = document.getElementById('address3') as HTMLInputElement;
const $dropdown5 = document.getElementById('dropdown5') as HTMLElement;
const $result5 = document.getElementById('js-result5') as HTMLInputElement;

const hideDropdown5 = () => {
  $dropdown5.innerText = '';
};

$address3.addEventListener('input', async (event) => {
  const target = event.target as HTMLInputElement;
  const data = await goqZipCode
    .searchZipcodeFromAddress({
      address: String(target.value),
    })
    .catch((err) => {
      return [];
    });

  const template = data
    .map(
      (item: app.response) =>
        `<li><button type="button" class="js-dropdownButton goqzip-dropdown__button">〒${item.zipcode}（${item.pref}${item.city}${item.town}）</button></li>`
    )
    .join('');

  $dropdown5.innerHTML = template
    ? `<ul class="goqzip-dropdown__list">${template}</ul>`
    : '';

  const $dropdownButton = document.querySelectorAll('.js-dropdownButton');
  $dropdownButton.forEach((x, index) => {
    x.addEventListener('click', () => {
      const target = data[index];
      $address3.value = `${target.pref}${target.city}${target.town}`;
      $result5.value = target.zipcode;
    });
  });

  document.addEventListener('click', hideDropdown5, { once: true });
});
