
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import logo from '../logo.svg'
import { request } from '../axios'
import { Link } from 'react-router-dom'


function Services() {




  return (
    <div>
      <nav className="bg-white p-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-4" />
          <span className="text-black text-lg font-semibold">Build4You</span>
        </div>
        <div className="md:flex md:space-x-4">
         
        <ul className="flex space-x-4 mt-4 md:mt-0">
                        <li>
                            <Link to={"/"}>
                            <p className="text-black hover:text-blue-300">
                                Home
                            </p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/companies"}>
                            <p className="text-black hover:text-blue-300">
                                Company
                            </p>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/services"}>
                            <a className="text-black hover:text-blue-300">
                                Services
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/projects"}>
                            <a className="text-black hover:text-blue-300">
                                Projects
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/appointments"}>
                            <a className="text-black hover:text-blue-300">
                                Appointment
                            </a>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/user-profile"}>
                            <a className="text-black hover:text-blue-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8a5 5 0 00-10 0v4a5 5 0 0010 0V8z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 22h2a2 2 0 002-2v-1a7 7 0 00-7-7H9a7 7 0 00-7 7v1a2 2 0 002 2h2"
                                    />
                                </svg>
                            </a>
                            </Link>
                        </li>
                    </ul>
        </div>
      </nav>









      <section class="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div class="container mx-auto">
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4">
              <div class="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                <span class="text-primary mb-2 block text-lg font-semibold">
                  Our Services
                </span>
                <h2
                  class="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]"
                >
                  What We Offer
                </h2>
                <p class="text-body-color text-base">
                  There are many variations of passages of contents  available but
                  the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
              >
                <div
                  class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.6746 0.26779C10.0637 -1.33065 1.86522 4.39279 0.266779 13.0037C-0.506658 17.1803 0.421467 21.3568 2.79334 24.8631C5.21678 28.3693 8.82615 30.6897 12.9512 31.4631C13.9308 31.6178 14.859 31.7209 15.7871 31.7209C23.2637 31.7209 29.9668 26.3584 31.359 18.6756C32.9574 10.0647 27.234 1.81466 18.6746 0.26779ZM29.6574 18.3662C29.5543 18.8819 29.4512 19.449 29.2965 19.9131L16.7668 15.2209V1.81466C17.2824 1.86623 17.8496 1.91779 18.3652 2.02091C25.9449 3.4131 30.998 10.735 29.6574 18.3662ZM14.9105 1.81466V14.9115H1.86522C1.91678 14.3959 1.96834 13.8287 2.07147 13.3131C3.20584 6.86779 8.67147 2.22716 14.9105 1.81466ZM13.3121 29.6584C9.65115 28.9881 6.45428 26.9256 4.28865 23.8318C2.79334 21.7178 1.96834 19.2428 1.81365 16.7678H15.6324L28.5746 21.6147C26.048 27.3381 19.7574 30.8443 13.3121 29.6584Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 class="text-dark mb-3 text-xl font-semibold">
                  Online Support
                </h4>
                <p class="text-body-color">
                  "Experience unparalleled online support for your business website. Our dedicated team is committed to providing top-notch assistance, ensuring your website runs smoothly and efficiently. Count on us for expert guidance and solutions, delivering exceptional service that empowers your online success."
                </p>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
              >
                <div
                  class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                >
                  <svg
                    width="39"
                    height="22"
                    viewBox="0 0 39 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1" fill="white">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.5004 0C14.6345 0 11.4767 2.14015 10.0251 6.42044C9.95552 6.62552 10.2264 6.7705 10.3756 6.61355C12.182 4.7134 14.2484 4.03687 16.575 4.58345C18.0583 4.93186 19.119 5.94382 20.2921 7.0642C22.2042 8.88862 24.4173 11 29.2502 11C34.1152 11 37.2736 8.85997 38.7247 4.58049C38.7943 4.3754 38.5234 4.23044 38.3742 4.38741C36.5684 6.28738 34.502 6.96375 32.1756 6.41655C30.6915 6.06814 29.6308 5.05618 28.4577 3.93652C26.5456 2.11066 24.3333 0 19.5004 0ZM-nan -nanL9.74981 11C4.88456 11 1.72609 13.1402 0.275037 17.4207C0.205519 17.6258 0.476365 17.7707 0.62555 17.6138C2.43196 15.7135 4.49843 15.0368 6.82441 15.5835C8.30851 15.9319 9.36923 16.9438 10.5423 18.0642C12.4544 19.8886 14.6667 22 19.5004 22C24.3656 22 27.5241 19.8604 28.9752 15.58C29.0447 15.3749 28.7738 15.23 28.6246 15.3869C26.8182 17.2873 24.7517 17.9639 22.425 17.4173C20.9417 17.0681 19.881 16.0562 18.7079 14.9365C16.7958 13.1121 14.5827 11 9.74981 11L-nan -nanL-nan -nanZ"
                      />
                    </mask>
                    <path
                      d="M16.575 4.58345L16.3463 5.55695L16.3463 5.55696L16.575 4.58345ZM20.2921 7.0642L19.6014 7.78736L19.6018 7.78769L20.2921 7.0642ZM32.1756 6.41655L32.4046 5.44311L32.4041 5.44301L32.1756 6.41655ZM28.4577 3.93652L27.7671 4.65974L27.7673 4.6599L28.4577 3.93652ZM6.82441 15.5835L6.59564 16.5569L6.59586 16.557L6.82441 15.5835ZM10.5423 18.0642L9.85161 18.7874L9.85196 18.7877L10.5423 18.0642ZM22.425 17.4173L22.1959 18.3907L22.1963 18.3908L22.425 17.4173ZM18.7079 14.9365L19.3983 14.2131L19.3982 14.213L18.7079 14.9365ZM0.275037 17.4207L-0.672026 17.0997L0.275037 17.4207ZM0.62555 17.6138L-0.0992438 16.9248L0.62555 17.6138ZM28.9752 15.58L29.9222 15.901L28.9752 15.58ZM28.6246 15.3869L27.8998 14.6979L28.6246 15.3869ZM38.7247 4.58049L37.7777 4.25936L38.7247 4.58049ZM38.3742 4.38741L39.099 5.07632L38.3742 4.38741ZM10.0251 6.42044L9.07806 6.09926L10.0251 6.42044ZM10.3756 6.61355L11.1004 7.30255L10.3756 6.61355ZM19.5004 -1C16.9224 -1 14.7064 -0.432275 12.9214 0.777273C11.1301 1.99111 9.86051 3.79212 9.07806 6.09926L10.9721 6.74162C11.6413 4.76847 12.6764 3.35925 14.0434 2.43295C15.4167 1.50235 17.2126 1 19.5004 1V-1ZM11.1004 7.30255C12.6907 5.62967 14.4042 5.10069 16.3463 5.55695L16.8037 3.60996C14.0926 2.97305 11.6733 3.79712 9.65083 5.92456L11.1004 7.30255ZM16.3463 5.55696C17.5202 5.83268 18.3899 6.63023 19.6014 7.78736L20.9828 6.34104C19.8482 5.25741 18.5964 4.03104 16.8036 3.60995L16.3463 5.55696ZM19.6018 7.78769C20.5507 8.69312 21.6704 9.7678 23.1998 10.5957C24.7495 11.4346 26.6758 12 29.2502 12V10C26.9917 10 25.395 9.50973 24.1519 8.83684C22.8885 8.15292 21.9456 7.2597 20.9824 6.34071L19.6018 7.78769ZM29.2502 12C31.8278 12 34.0437 11.4323 35.8286 10.2229C37.6199 9.00923 38.8895 7.20846 39.6718 4.90163L37.7777 4.25936C37.1088 6.23199 36.0737 7.64098 34.7067 8.56718C33.3334 9.49769 31.5376 10 29.2502 10V12ZM37.6493 3.6985C36.0597 5.37104 34.3464 5.89986 32.4046 5.44311L31.9466 7.38998C34.6577 8.02765 37.0771 7.20371 39.099 5.07632L37.6493 3.6985ZM32.4041 5.44301C31.2295 5.16725 30.3598 4.36966 29.1482 3.21314L27.7673 4.6599C28.9017 5.74271 30.1535 6.96904 31.947 7.39008L32.4041 5.44301ZM29.1483 3.2133C28.1993 2.30704 27.0797 1.23211 25.5504 0.404169C24.0008 -0.434783 22.0747 -1 19.5004 -1V1C21.7589 1 23.3554 1.49011 24.5983 2.16296C25.8614 2.84681 26.8041 3.74014 27.7671 4.65974L29.1483 3.2133ZM9.74981 10C7.17206 10 4.95609 10.5678 3.17112 11.7774C1.3798 12.9913 0.110142 14.7924 -0.672026 17.0997L1.2221 17.7418C1.89099 15.7686 2.92609 14.3594 4.29308 13.433C5.66642 12.5024 7.46231 12 9.74981 12V10ZM1.35034 18.3028C2.94075 16.6297 4.65428 16.1007 6.59564 16.5569L7.05318 14.61C4.34259 13.973 1.92317 14.7973 -0.0992438 16.9248L1.35034 18.3028ZM6.59586 16.557C7.77045 16.8327 8.64013 17.6303 9.85161 18.7874L11.233 17.341C10.0983 16.2573 8.84657 15.031 7.05295 14.6099L6.59586 16.557ZM9.85196 18.7877C10.8008 19.6931 11.9204 20.7678 13.4497 21.5957C14.9993 22.4346 16.9257 23 19.5004 23V21C17.2415 21 15.6448 20.5097 14.4018 19.8368C13.1385 19.1529 12.1958 18.2598 11.2326 17.3407L9.85196 18.7877ZM19.5004 23C22.0781 23 24.294 22.4324 26.079 21.223C27.8704 20.0093 29.14 18.2084 29.9222 15.901L28.0281 15.2589C27.3592 17.232 26.3241 18.6411 24.9572 19.5673C23.5838 20.4978 21.7879 21 19.5004 21V23ZM27.8998 14.6979C26.3095 16.371 24.5959 16.9 22.6537 16.4438L22.1963 18.3908C24.9075 19.0277 27.327 18.2035 29.3494 16.0759L27.8998 14.6979ZM22.6541 16.4439C21.4798 16.1675 20.61 15.3697 19.3983 14.2131L18.0174 15.6599C19.1519 16.7427 20.4035 17.9688 22.1959 18.3907L22.6541 16.4439ZM19.3982 14.213C18.4494 13.3077 17.3296 12.2328 15.8003 11.4047C14.2506 10.5656 12.3242 10 9.74981 10V12C12.0083 12 13.6049 12.4904 14.848 13.1635C16.1115 13.8476 17.0544 14.741 18.0176 15.66L19.3982 14.213ZM-0.672026 17.0997C-0.889639 17.7416 -0.537234 18.2988 -0.109577 18.5315C0.304715 18.7568 0.918575 18.757 1.35034 18.3028L-0.0992438 16.9248C0.18334 16.6276 0.587185 16.6337 0.846137 16.7746C1.11845 16.9227 1.3702 17.3049 1.2221 17.7418L-0.672026 17.0997ZM29.9222 15.901C30.1398 15.2591 29.7874 14.7019 29.3598 14.4693C28.9455 14.2439 28.3316 14.2437 27.8998 14.6979L29.3494 16.0759C29.0669 16.3732 28.663 16.367 28.4041 16.2261C28.1317 16.078 27.88 15.6958 28.0281 15.2589L29.9222 15.901ZM39.6718 4.90163C39.8895 4.25959 39.537 3.70235 39.1093 3.46973C38.695 3.24438 38.0811 3.24419 37.6493 3.6985L39.099 5.07632C38.8164 5.37366 38.4126 5.36747 38.1537 5.22663C37.8814 5.07852 37.6295 4.69631 37.7777 4.25936L39.6718 4.90163ZM9.07806 6.09926C8.86033 6.74124 9.21275 7.29849 9.64037 7.53115C10.0546 7.75655 10.6685 7.7568 11.1004 7.30255L9.65083 5.92456C9.93346 5.62726 10.3373 5.63349 10.5962 5.77436C10.8685 5.9225 11.1203 6.30472 10.9721 6.74162L9.07806 6.09926Z"
                      fill="white"
                      mask="url(#path-1-inside-1)"
                    />
                  </svg>
                </div>
                <h4 class="text-dark mb-3 text-xl font-semibold">
                  Chatting Fecility
                </h4>
                <p class="text-body-color">

                  "Get the same exceptional support via our live chat facility. Our dedicated team is just a click away, ready to assist you in real-time. Experience seamless communication and expert guidance, making your online business journey smoother than ever."
                </p>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
              >
                <div
                  class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7734 14.3281H3.82813C2.07813 14.3281 0.65625 12.9062 0.65625 11.1562V4.21094C0.65625 2.46094 2.07813 1.03906 3.82813 1.03906H10.7734C12.5234 1.03906 13.9453 2.46094 13.9453 4.21094V11.1562C13.9453 12.9062 12.5234 14.3281 10.7734 14.3281ZM3.82813 2.95312C3.17188 2.95312 2.57031 3.5 2.57031 4.21094V11.1562C2.57031 11.8125 3.11719 12.4141 3.82813 12.4141H10.7734C11.4297 12.4141 12.0313 11.8672 12.0313 11.1562V4.21094C12.0313 3.55469 11.4844 2.95312 10.7734 2.95312H3.82813Z"
                      fill="white"
                    />
                    <path
                      d="M31.1719 14.3281H24.2266C22.4766 14.3281 21.0547 12.9062 21.0547 11.1562V4.21094C21.0547 2.46094 22.4766 1.03906 24.2266 1.03906H31.1719C32.9219 1.03906 34.3438 2.46094 34.3438 4.21094V11.1562C34.3438 12.9062 32.9219 14.3281 31.1719 14.3281ZM24.2266 2.95312C23.5703 2.95312 22.9688 3.5 22.9688 4.21094V11.1562C22.9688 11.8125 23.5156 12.4141 24.2266 12.4141H31.1719C31.8281 12.4141 32.4297 11.8672 32.4297 11.1562V4.21094C32.4297 3.55469 31.8828 2.95312 31.1719 2.95312H24.2266Z"
                      fill="white"
                    />
                    <path
                      d="M10.7734 33.9609H3.82813C2.07813 33.9609 0.65625 32.5391 0.65625 30.7891V23.8438C0.65625 22.0938 2.07813 20.6719 3.82813 20.6719H10.7734C12.5234 20.6719 13.9453 22.0938 13.9453 23.8438V30.7891C13.9453 32.5391 12.5234 33.9609 10.7734 33.9609ZM3.82813 22.5859C3.17188 22.5859 2.57031 23.1328 2.57031 23.8438V30.7891C2.57031 31.4453 3.11719 32.0469 3.82813 32.0469H10.7734C11.4297 32.0469 12.0313 31.5 12.0313 30.7891V23.8438C12.0313 23.1875 11.4844 22.5859 10.7734 22.5859H3.82813Z"
                      fill="white"
                    />
                    <path
                      d="M31.1719 33.9609H24.2266C22.4766 33.9609 21.0547 32.5391 21.0547 30.7891V23.8438C21.0547 22.0938 22.4766 20.6719 24.2266 20.6719H31.1719C32.9219 20.6719 34.3438 22.0938 34.3438 23.8438V30.7891C34.3438 32.5391 32.9219 33.9609 31.1719 33.9609ZM24.2266 22.5859C23.5703 22.5859 22.9688 23.1328 22.9688 23.8438V30.7891C22.9688 31.4453 23.5156 32.0469 24.2266 32.0469H31.1719C31.8281 32.0469 32.4297 31.5 32.4297 30.7891V23.8438C32.4297 23.1875 31.8828 22.5859 31.1719 22.5859H24.2266Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 class="text-dark mb-3 text-xl font-semibold">100+ Companies</h4>
                <p class="text-body-color">
                  "Join over 100 companies who have experienced our unparalleled online support. With a track record of excellence, our dedicated team is here to assist you 24/7 via live chat. Trust in our expertise to enhance your online business journey, just like our satisfied clients from diverse industries."
                </p>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
              >
                <div
                  class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 7.875C8.20312 7.875 0.65625 16.0781 0.65625 26.1406C0.65625 26.6875 1.09375 27.125 1.64062 27.125H33.3594C33.9062 27.125 34.3438 26.6875 34.3438 26.1406C34.3438 16.0781 26.7969 7.875 17.5 7.875ZM19.4687 25.2109L17.9922 20.5078C17.8281 20.0156 17.1719 20.0156 17.0078 20.5078L15.5312 25.2109H2.625C3.0625 16.625 9.57031 9.78906 17.5 9.78906C25.4297 9.78906 31.9375 16.625 32.375 25.2109H19.4687Z"
                      fill="white"
                    />
                    <path
                      d="M17.5 13.7812C16.9531 13.7812 16.5156 14.2187 16.5156 14.7656V16.1875C16.5156 16.7344 16.9531 17.1719 17.5 17.1719C18.0469 17.1719 18.4844 16.7344 18.4844 16.1875V14.7656C18.4844 14.2187 18.0469 13.7812 17.5 13.7812Z"
                      fill="white"
                    />
                    <path
                      d="M25.8672 17.8828L24.9922 18.8125C24.6094 19.1953 24.6094 19.7969 24.9922 20.1797C25.1563 20.3438 25.4297 20.4531 25.6484 20.4531C25.9219 20.4531 26.1406 20.3438 26.3594 20.1797L27.2344 19.25C27.6172 18.8672 27.6172 18.2656 27.2344 17.8828C26.8516 17.5 26.25 17.5 25.8672 17.8828Z"
                      fill="white"
                    />
                    <path
                      d="M9.13281 17.8828C8.80468 17.5 8.14843 17.4453 7.76562 17.8281C7.38281 18.1562 7.32812 18.8125 7.71093 19.1953L8.53125 20.125C8.69531 20.3437 8.96874 20.4531 9.24218 20.4531C9.46093 20.4531 9.67968 20.3984 9.89843 20.2344C10.2812 19.9062 10.3359 19.25 9.95312 18.8672L9.13281 17.8828Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 class="text-dark mb-3 text-xl font-semibold">Top Project Awards</h4>
                <p class="text-body-color">
                  "Explore our top project awards, showcasing our commitment to excellence. These accolades highlight our dedication to delivering outstanding results across various industries. Join us in celebrating the achievements that set us apart and make us the preferred choice for your next project."
                </p>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
              >
                <div
                  class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.5312 21.6562L28.6563 21.1641L29.6953 20.5625C30.7344 19.9062 31.3359 18.8125 31.2812 17.6094C31.2266 16.4063 30.625 15.3125 29.5312 14.7109L27.8906 13.7813L29.6406 12.6875C30.6797 12.0313 31.2812 10.9375 31.2266 9.73438C31.1719 8.53125 30.5703 7.4375 29.4766 6.83594L19.25 1.09375C18.2109 0.492187 16.9531 0.546875 15.9141 1.09375L5.41406 7.21875C4.375 7.82031 3.71875 8.91406 3.71875 10.1172C3.71875 11.3203 4.375 12.4141 5.41406 13.0156L7.10938 14L5.41406 14.9844C4.375 15.5859 3.71875 16.6797 3.71875 17.8828C3.71875 19.0859 4.32031 20.1797 5.41406 20.7812L6.39844 21.3281L5.46875 21.875C4.42969 22.4766 3.77344 23.5703 3.77344 24.7734C3.77344 25.9766 4.375 27.0703 5.46875 27.6719L15.9141 33.6875C16.4609 34.0156 17.0078 34.125 17.6094 34.125C18.2109 34.125 18.8125 33.9609 19.3594 33.6328L29.6953 27.2891C30.7344 26.6328 31.3359 25.5391 31.2812 24.3359C31.2266 23.2969 30.625 22.2031 29.5312 21.6562ZM5.63281 10.1172C5.63281 9.57031 5.90625 9.13281 6.34375 8.85938L16.8438 2.78906C17.0625 2.67969 17.3359 2.57031 17.5547 2.57031C17.7734 2.57031 18.0469 2.625 18.2656 2.73437L28.5469 8.47656C28.9844 8.75 29.2578 9.1875 29.3125 9.73438C29.3125 10.2812 29.0391 10.7188 28.6016 10.9922L18.3203 17.3906C17.8828 17.6641 17.2812 17.6641 16.8438 17.3906L6.39844 11.375C5.90625 11.1562 5.63281 10.6641 5.63281 10.1172ZM5.63281 17.9375C5.63281 17.3906 5.90625 16.9531 6.34375 16.6797L9.02344 15.1484L15.8594 19.0859C16.4062 19.4141 16.9531 19.5234 17.5547 19.5234C18.1562 19.5234 18.7578 19.3594 19.3047 19.0312L26.0312 14.875L28.6016 16.2969C29.0391 16.5703 29.3125 17.0078 29.3672 17.5547C29.3672 18.1016 29.0938 18.5391 28.6563 18.8125L18.3203 25.2656C17.8828 25.5391 17.2812 25.5391 16.8438 25.2656L6.39844 19.25C5.90625 18.9766 5.63281 18.4844 5.63281 17.9375ZM28.6563 25.8125L18.3203 32.2109C17.8828 32.4844 17.2812 32.4844 16.8438 32.2109L6.39844 26.1953C5.96094 25.9219 5.6875 25.4844 5.6875 24.9375C5.6875 24.3906 5.96094 23.9531 6.39844 23.6797L8.3125 22.5859L15.8594 26.9609C16.4062 27.2891 16.9531 27.3984 17.5547 27.3984C18.1562 27.3984 18.7578 27.2344 19.3047 26.9062L26.7969 22.2578L28.6563 23.2969C29.0938 23.5703 29.3672 24.0078 29.4219 24.5547C29.3672 25.0469 29.0938 25.5391 28.6563 25.8125Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 class="text-dark mb-3 text-xl font-semibold">
                  High Qualuty With Less Money
                </h4>
                <p class="text-body-color">

                  "Experience high-quality solutions without breaking the bank. Our cost-effective approach ensures you get top-notch results while saving your hard-earned money. Discover the perfect balance of quality and affordability with us."
                </p>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
              >
                <div
                  class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.04684 15.5859C4.2109 15.5859 4.37497 15.5859 4.48434 15.5313L10.5547 13.3984C11.0468 13.2344 11.3203 12.6875 11.1562 12.1953C10.9922 11.7031 10.4453 11.4297 9.95309 11.5938L6.28903 12.9063C8.09372 7.92969 12.8515 4.53906 18.375 4.53906C24.2265 4.53906 29.3672 8.42188 30.789 14.0547C30.8984 14.5469 31.4453 14.875 31.9375 14.7656C32.4297 14.6563 32.7578 14.1094 32.6484 13.6172C31.0078 7.16406 25.1015 2.67969 18.375 2.67969C11.8125 2.67969 6.12497 6.89063 4.26559 13.0156L2.57028 8.25781C2.40622 7.76563 1.85934 7.49219 1.36715 7.65625C0.874967 7.82031 0.60153 8.36719 0.765592 8.85938L2.84372 14.8203C3.00778 15.2578 3.55465 15.5859 4.04684 15.5859Z"
                      fill="white"
                    />
                    <path
                      d="M34.2343 27.2891L31.9922 21.3828C31.8828 21.0547 31.6093 20.7812 31.2812 20.6719C30.9531 20.5625 30.625 20.5078 30.2968 20.6719L24.2812 22.9687C23.789 23.1328 23.5156 23.7344 23.7343 24.2266C23.8984 24.7187 24.5 24.9922 24.9922 24.7734L28.7109 23.3516C26.6328 27.6719 22.2031 30.5156 17.1718 30.5156C11.6484 30.5156 6.78122 27.0703 5.0859 21.9297C4.86715 21.4375 4.32028 21.1641 3.82809 21.3281C3.3359 21.4922 3.06247 22.0391 3.22653 22.5312C5.19528 28.4375 10.7734 32.4297 17.1172 32.4297C23.1328 32.4297 28.4922 28.875 30.6797 23.4609L32.4297 28C32.5937 28.3828 32.9218 28.6016 33.3047 28.6016C33.414 28.6016 33.5234 28.6016 33.6328 28.5469C34.1797 28.3281 34.4531 27.7813 34.2343 27.2891Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h4 class="text-dark mb-3 text-xl font-semibold">Project Based Service</h4>
                <p class="text-body-color">
                  "Discover our project-based services, tailored to meet your unique needs. With a focus on delivering results and exceeding expectations, we're your trusted partner for successful project outcomes. Let us turn your vision into reality, one project at a time."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>













      {/* Footer  Section */}


      <div class="relative flex justify-start md:justify-center md:items-end ">
        <img class="absolute dark:hidden object-cover top-10 h-full w-full xl:mt-10 z-0" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/footer_5_marketing_background.png" alt="background" />
        <div class="flex pt-36 md:pt-32 lg:pt-40 xl:pt-96   px-4 md:px-6  xl:px-20 flex-col justify-start items-start md:justify-center md:items-center relative z-10">
          <div class="flex  flex-col items-start justify-start xl:justify-center xl:space-x-8 xl:flex-row">
            <div class="flex justify-start items-center space-x-4">
              <div class="cursor-pointer w-12">
                <img src={logo} alt="logo" />
              </div>
              <p class="w-60 text-xl xl:text-2xl font-semibold leading-normal text-white">Build For You</p>
            </div>
            <div class="mt-12 xl:mt-0 grid grid-cols-1 sm:grid-cols-3 gap-y-12 sm:gap-y-0 w-full md:w-auto sm:gap-x-20 md:gap-x-28 xl:gap-8">
              <div class="sm:w-40 md:w-auto xl:w-72 flex justify-start items-start flex-col space-y-6">
                <h2 class="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Community</h2>
                <button class="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  About Us
                </button>
                <button class="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Guidelines and how to
                </button>
                <button class="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  Quote from the best
                </button>
                <button class="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  How to start a blog
                </button>
              </div>

              <div class="sm:w-40 md:w-auto xl:w-72 flex justify-start items-start flex-col space-y-6">
                <h2 class="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Getting Started</h2>
                <button class="text-left text-base hover:text-gray-400 leading-none text-gray-100">
                  About Us
                </button>

              </div>

              <div class=" xl:w-72 flex justify-start items-start flex-col space-y-6">
                <h2 class="text-base xl:text-xl font-bold xl:font-semibold leading-4 xl:leading-5 text-white">Resources</h2>
                <button class="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Accessibility
                </button>
                <button class="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Usability
                </button>
                <button class="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Marketplace
                </button>
                <button class="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Design & Dev
                </button>
                <button class="text-base text-left hover:text-gray-400 leading-none text-gray-100">
                  Marketplace
                </button>
              </div>
            </div>
          </div>
          <div class="mt-12 flex  xl:justify-between xl:flex-row flex-col-reverse items-center xl:items-start w-full ">
            <p class="mt-10 md:mt-12 xl:mt-0 text-sm leading-none text-white" >2020 The Good Company. All Rights Reserved</p>
            <div class="mt-10 md:mt-12 xl:mt-0 md:flex-row flex-col flex md:justify-center w-full md:w-auto justify-start items-start space-y-4 md:space-y-0 md:items-center md:space-x-4 xl:space-x-6">
              <button class="text-base leading-none text-white hover:text-gray-300">
                Terms of service
              </button>
              <button class="text-base leading-none text-white hover:text-gray-300">
                Privacy Policy
              </button>
              <button class="text-base leading-none text-white hover:text-gray-300">
                Security
              </button>
              <button class="text-base leading-none text-white hover:text-gray-300">
                Sitemap
              </button>
            </div>
            <div class="flex  justify-start md:justify-end items-start  w-full md:w-auto md:items-center space-x-6 ">
              <button class="text-white hover:text-gray-200 w-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.25 5.13282C22.406 5.49955 21.513 5.74116 20.5992 5.85001C21.5595 5.28769 22.2817 4.39434 22.6303 3.33751C21.7224 3.86841 20.7307 4.24092 19.6978 4.43907C19.2629 3.98322 18.7397 3.62059 18.1603 3.3732C17.5808 3.12581 16.9571 2.99884 16.327 3.00001C13.7761 3.00001 11.7117 5.03438 11.7117 7.5422C11.7099 7.89102 11.7499 8.23881 11.8308 8.57813C10.0016 8.49238 8.2104 8.02575 6.57187 7.2081C4.93333 6.39044 3.48351 5.23977 2.31516 3.8297C1.90527 4.52069 1.6885 5.30909 1.6875 6.11251C1.6875 7.68751 2.50922 9.0797 3.75 9.89532C3.01487 9.87787 2.29481 9.68331 1.65094 9.32813V9.38438C1.65094 11.5875 3.24469 13.4203 5.35406 13.8375C4.9574 13.9433 4.54864 13.9968 4.13812 13.9969C3.84683 13.9974 3.5562 13.9691 3.27047 13.9125C3.85687 15.7172 5.56359 17.0297 7.58531 17.0672C5.94252 18.3333 3.9256 19.0175 1.85156 19.0125C1.48341 19.012 1.11561 18.99 0.75 18.9469C2.85993 20.2942 5.31255 21.0068 7.81594 21C16.3172 21 20.9616 14.0766 20.9616 8.07188C20.9616 7.87501 20.9564 7.67813 20.947 7.48595C21.8485 6.84472 22.6283 6.04787 23.25 5.13282V5.13282Z" fill="currentColor" />
                </svg>
              </button>
              <button class="text-white hover:text-gray-200 w-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 12.0645C22.5 6.26602 17.7984 1.56445 12 1.56445C6.20156 1.56445 1.5 6.26602 1.5 12.0645C1.5 17.3051 5.33906 21.649 10.3594 22.4374V15.1005H7.69266V12.0645H10.3594V9.75117C10.3594 7.12008 11.9273 5.66555 14.3255 5.66555C15.4744 5.66555 16.6763 5.87086 16.6763 5.87086V8.45508H15.3516C14.048 8.45508 13.6402 9.26414 13.6402 10.0957V12.0645H16.552L16.087 15.1005H13.6406V22.4384C18.6609 21.6504 22.5 17.3065 22.5 12.0645Z" fill="currentColor" />
                </svg>
              </button>
              <button class="text-white hover:text-gray-200 w-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1.5C6.20297 1.5 1.5 6.20297 1.5 12C1.5 17.797 6.20297 22.5 12 22.5C17.797 22.5 22.5 17.8022 22.5 12C22.5 6.19781 17.797 1.5 12 1.5ZM18.6666 6.33984C19.8815 7.76805 20.6046 9.54925 20.7291 11.4202C18.8367 11.3217 16.5727 11.3217 14.7572 11.4914C14.5275 10.9116 14.2922 10.343 14.0353 9.79594C16.1288 8.88844 17.7422 7.69594 18.6666 6.33984ZM12 3.24984C14.0395 3.24634 16.0156 3.95866 17.5837 5.26266C16.6322 6.46547 15.1392 7.51266 13.2797 8.30297C12.2625 6.42188 11.092 4.80328 9.84375 3.52875C10.5482 3.3469 11.2725 3.25322 12 3.24984V3.24984ZM8.04047 4.20703C9.30375 5.46469 10.4906 7.06641 11.5298 8.94141C9.55547 9.54469 7.29141 9.89062 4.875 9.89062C4.41562 9.89062 3.9675 9.87422 3.52453 9.84656C3.83266 8.63935 4.3949 7.5118 5.17367 6.53927C5.95244 5.56673 6.92981 4.77161 8.04047 4.20703V4.20703ZM3.26625 11.5842C3.76406 11.6063 4.26703 11.617 4.77562 11.6119C7.53187 11.5791 10.0969 11.1469 12.3009 10.44C12.5088 10.8722 12.7056 11.3152 12.8916 11.7689C12.6252 11.8272 12.3637 11.9056 12.1092 12.0033C9.09609 13.2689 6.72281 15.3084 5.4375 17.775C4.02813 16.1814 3.25007 14.1274 3.24984 12C3.24984 11.8594 3.25547 11.7211 3.26625 11.5842ZM12 20.7502C10.056 20.7525 8.16724 20.1036 6.63516 18.907C7.8 16.5994 9.87797 14.6883 12.4978 13.5037C12.7439 13.3889 13.072 13.2961 13.4494 13.2141C13.7619 14.0778 14.0408 14.9747 14.2861 15.9047C14.6525 17.3083 14.9223 18.7354 15.0938 20.1759C14.1061 20.5543 13.0576 20.7489 12 20.7502V20.7502ZM16.7306 19.3556C16.5595 17.9001 16.2871 16.4584 15.9155 15.0408C15.728 14.3297 15.5166 13.6406 15.2869 12.968C17.0039 12.8273 19.0603 12.8475 20.6953 12.968C20.5512 14.2606 20.1206 15.5047 19.4347 16.6097C18.7488 17.7148 17.825 18.6529 16.7306 19.3556V19.3556Z" fill="currentColor" />
                </svg>
              </button>
              <button class="text-white hover:text-gray-200 w-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1.5C6.20156 1.5 1.5 6.32344 1.5 12.2672C1.5 17.025 4.50937 21.0562 8.68125 22.4812C8.73977 22.494 8.79949 22.5002 8.85938 22.5C9.24844 22.5 9.39844 22.2141 9.39844 21.9656C9.39844 21.7078 9.38906 21.0328 9.38437 20.1328C9.03705 20.2142 8.68173 20.2567 8.325 20.2594C6.30469 20.2594 5.84531 18.6891 5.84531 18.6891C5.36719 17.4469 4.67813 17.1141 4.67813 17.1141C3.76406 16.4719 4.67344 16.4531 4.74375 16.4531H4.74844C5.80313 16.5469 6.35625 17.5687 6.35625 17.5687C6.88125 18.4875 7.58437 18.7453 8.2125 18.7453C8.62783 18.737 9.03673 18.6412 9.4125 18.4641C9.50625 17.7703 9.77812 17.2969 10.0781 17.025C7.74844 16.7531 5.29688 15.8297 5.29688 11.7047C5.29688 10.5281 5.70469 9.56719 6.375 8.81719C6.26719 8.54531 5.90625 7.44844 6.47812 5.96719C6.55483 5.94883 6.63368 5.94095 6.7125 5.94375C7.09219 5.94375 7.95 6.08906 9.36563 7.07344C11.0857 6.59218 12.9049 6.59218 14.625 7.07344C16.0406 6.08906 16.8984 5.94375 17.2781 5.94375C17.357 5.94095 17.4358 5.94883 17.5125 5.96719C18.0844 7.44844 17.7234 8.54531 17.6156 8.81719C18.2859 9.57187 18.6937 10.5328 18.6937 11.7047C18.6937 15.8391 16.2375 16.7484 13.8984 17.0156C14.2734 17.3484 14.6109 18.0047 14.6109 19.0078C14.6109 20.4469 14.5969 21.6094 14.5969 21.9609C14.5969 22.2141 14.7422 22.5 15.1312 22.5C15.1942 22.5003 15.2571 22.494 15.3187 22.4812C19.4953 21.0562 22.5 17.0203 22.5 12.2672C22.5 6.32344 17.7984 1.5 12 1.5Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Services