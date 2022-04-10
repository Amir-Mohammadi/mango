# Parlar IoT platform documentation

## Introduction

مستندات زیر شامل مشخصات سیستم، جامعه هدف و جزئیات طراحی پلتفرم جامع اینترنت اشیا شرکت پارلار میباشد.

### Purpose

هدف از این پروژه فراهم سازی بستری برای ساخت و کنترل دستگاه های اینترنت اشیا مانند کلید و پریز های هوشمند می باشد.

### References

[برنامه خانه هوشمند شائومی](https://play.google.com/store/apps/details?id=com.xiaomi.smarthome&hl=en_US&gl=US)

## Overview

محصول شامل یک سرور things board است که به عنوان هسته سیستم عمل میکند. وضیفه این سیستم مدیریت داده های سری زمانی (مانند دما) میباشد. بقیه عملیات مانند کنترل کاربران و اشتراک گذاری در API جداگانه انجام میشود. برنامه موبایل برای کاربران طراحی شده که وظیفه اضافه کردن دستگاه جدید، کنترل دستگاه ها موجود، اشراک گذاری و مدیریت پروفایل کاربری را بر عهده دارد. هر مدل از دستگاه پنل مدیریتی اختصاصی خود را دارا می باشد.

## Design Guidelines

## System Architecture

![image](docs/assets/blank-diagram.png)

## Software Architecture

## Hardware Architecture

### Claiming Device

[thingsbord claiming devices](https://thingsboard.io/docs/user-guide/claiming-devices/)

در این روش دستگاه تضمین میکند که در مراحل config ارتباط دو طرفه با برنامه client داشته باشد. به بیان دیگر دستگاه اطلاعات WiFi را از برنامه client میگیرد و در جواب BSSID و Secret ذخیره شده در داخل دستگاه را به client ارسال میکند.

![image](docs/assets/sequence-diagram.png)

تصمیم بر این شد که لایبرری SmartConfig به گونه ای باشد پس از عملیات کانفیگ در جواب به جز BSSID باید Secret دخیره شده در دستگاه را بفرستد.

در طی ارسال اطلاعات WiFi با این لایبرری، IP کلاینت در شبکه داخلی نیز به دستگاه ارسال میشود تا جواب (شامل Secret و BSSID) مستقیما به خود Client برگردانده شود.

### Provisioning devices (قابلیت اضافه کردن دستگاه جدید، توسط خود دستگاه)

[thingsbord device provisioning](https://thingsboard.io/docs/user-guide/device-provisioning/)

در این حالت دستگاه ای که به تازگی از فرایند تولید خارج شده با اولین اتصال به اینترنت توانایی این را دارد که یک دستگاه جدید با mac آدرس خود در سرور ایجاد کند.

\***این عملیات حتما باید پس از تولید انجام شود، چرا که دستگاه در دست مشتری بدون این اطلاعات نمیتواند به سرور متصل شود. ودر نتیجه نمیتواند عملیات claim را به درستی انجام دهد.\***

![image](docs/assets/device-provisioning-flow.png)

## Design Specification

The next step is to investigate deeper into design requirements and expectations. This section covers many design aspects, and the exact number and order depend entirely on the system. Here, we’ll discuss the essential ones, so you know how to structure the section.

### Database Design

### User Interface Design

## P.S

[software design document guid](https://jelvix.com/blog/software-design-document)# Parlar IoT platform documentation

## Introduction

مستندات زیر شامل مشخصات سیستم، جامعه هدف و جزئیات طراحی پلتفرم جامع اینترنت اشیا شرکت پارلار میباشد.

### Purpose

هدف از این پروژه فراهم سازی بستری برای ساخت و کنترل دستگاه های اینترنت اشیا مانند کلید و پریز های هوشمند می باشد.

### References

[برنامه خانه هوشمند شائومی](https://play.google.com/store/apps/details?id=com.xiaomi.smarthome&hl=en_US&gl=US)

## Overview

محصول شامل یک سرور things board است که به عنوان هسته سیستم عمل میکند. وضیفه این سیستم مدیریت داده های سری زمانی (مانند دما) میباشد. بقیه عملیات مانند کنترل کاربران و اشتراک گذاری در API جداگانه انجام میشود. برنامه موبایل برای کاربران طراحی شده که وظیفه اضافه کردن دستگاه جدید، کنترل دستگاه ها موجود، اشراک گذاری و مدیریت پروفایل کاربری را بر عهده دارد. هر مدل از دستگاه پنل مدیریتی اختصاصی خود را دارا می باشد.

## Design Guidelines

## System Architecture

سیستم متشکل از هسته things board یک api و برنامه موبایل و دستگاه ها می باشد
وضیفه مدیریت داده های رد و بدل شده بین دستگاه و کلاینت موبایل کلا بر عهده things board می باشد(بدون هیچ واسطی). عملیات دسترسی به کاربران، مالکیت و اشتراک گذاری بر عهده API میاشد. API از دیتابیس خود و دیتا درون Things Board (برای مثال گرفتن لیست دستگاه ها) استفاده میکند، این API همچنین عملیات لاگین به برنامه در برنامه گوشی موبایل را نیز انجام میدهد.

![image](docs/assets/blank-diagram.png)

## Software Architecture

### API

coming soon...

## Hardware Architecture

### Claiming Device

[thingsbord claiming devices](https://thingsboard.io/docs/user-guide/claiming-devices/)

در این روش دستگاه تضمین میکند که در مراحل config ارتباط دو طرفه با برنامه client داشته باشد. به بیان دیگر دستگاه اطلاعات WiFi را از برنامه client میگیرد و در جواب BSSID و Secret ذخیره شده در داخل دستگاه را به client ارسال میکند.

![image](docs/assets/sequence-diagram.png)

تصمیم بر این شد که لایبرری SmartConfig به گونه ای باشد پس از عملیات کانفیگ در جواب به جز BSSID باید Secret دخیره شده در دستگاه را بفرستد.

در طی ارسال اطلاعات WiFi با این لایبرری، IP کلاینت در شبکه داخلی نیز به دستگاه ارسال میشود تا جواب (شامل Secret و BSSID) مستقیما به خود Client برگردانده شود.

### Provisioning devices (قابلیت اضافه کردن دستگاه جدید، توسط خود دستگاه)

[thingsbord device provisioning](https://thingsboard.io/docs/user-guide/device-provisioning/)

در این حالت دستگاه ای که به تازگی از فرایند تولید خارج شده با اولین اتصال به اینترنت توانایی این را دارد که یک دستگاه جدید با mac آدرس خود در سرور ایجاد کند.

\***این عملیات حتما باید پس از تولید انجام شود، چرا که دستگاه در دست مشتری بدون این اطلاعات نمیتواند به سرور متصل شود. ودر نتیجه نمیتواند عملیات claim را به درستی انجام دهد.\***

![image](docs/assets/device-provisioning-flow.png)

## Design Specification

The next step is to investigate deeper into design requirements and expectations. This section covers many design aspects, and the exact number and order depend entirely on the system. Here, we’ll discuss the essential ones, so you know how to structure the section.

### Database Design

### User Interface Design

## P.S

[software design document guid](https://jelvix.com/blog/software-design-document)
