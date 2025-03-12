const CalendarIcon = () => {
  return (
    <svg
      className="th-calendar-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="62"
      fill="none"
    >
      <mask id="A" fill="#fff">
        <path
          fillRule="evenodd"
          d="M0 7a5 5 0 0 1 5-5h50a5 5 0 0 1 5 5v50a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V7zm15-.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM24.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5zM39 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM48.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5z"
        ></path>
      </mask>
      <path
        fillRule="evenodd"
        d="M0 7a5 5 0 0 1 5-5h50a5 5 0 0 1 5 5v50a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V7zm15-.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM24.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5zM39 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0zM48.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 1 0 0 5z"
        fill="#f5f5f7"
      ></path>
      <g fill="#1d1d1f">
        <path
          d="M5 1.5A5.5 5.5 0 0 0-.5 7h1A4.5 4.5 0 0 1 5 2.5v-1zm50 0H5v1h50v-1zM60.5 7A5.5 5.5 0 0 0 55 1.5v1A4.5 4.5 0 0 1 59.5 7h1zm0 50V7h-1v50h1zM55 62.5a5.5 5.5 0 0 0 5.5-5.5h-1a4.5 4.5 0 0 1-4.5 4.5v1zm-50 0h50v-1H5v1zM-.5 57A5.5 5.5 0 0 0 5 62.5v-1A4.5 4.5 0 0 1 .5 57h-1zm0-50v50h1V7h-1zm13 2.5a3 3 0 0 0 3-3h-1a2 2 0 0 1-2 2v1zm-3-3a3 3 0 0 0 3 3v-1a2 2 0 0 1-2-2h-1zm3-3a3 3 0 0 0-3 3h1a2 2 0 0 1 2-2v-1zm3 3a3 3 0 0 0-3-3v1a2 2 0 0 1 2 2h1zm11 0a2 2 0 0 1-2 2v1a3 3 0 0 0 3-3h-1zm-2-2a2 2 0 0 1 2 2h1a3 3 0 0 0-3-3v1zm-2 2a2 2 0 0 1 2-2v-1a3 3 0 0 0-3 3h1zm2 2a2 2 0 0 1-2-2h-1a3 3 0 0 0 3 3v-1zm12 1a3 3 0 0 0 3-3h-1a2 2 0 0 1-2 2v1zm-3-3a3 3 0 0 0 3 3v-1a2 2 0 0 1-2-2h-1zm3-3a3 3 0 0 0-3 3h1a2 2 0 0 1 2-2v-1zm3 3a3 3 0 0 0-3-3v1a2 2 0 0 1 2 2h1zm11 0a2 2 0 0 1-2 2v1a3 3 0 0 0 3-3h-1zm-2-2a2 2 0 0 1 2 2h1a3 3 0 0 0-3-3v1zm-2 2a2 2 0 0 1 2-2v-1a3 3 0 0 0-3 3h1zm2 2a2 2 0 0 1-2-2h-1a3 3 0 0 0 3 3v-1z"
          mask="url(#A)"
        ></path>
        <use xlinkHref="#C"></use>
        <rect x="49" width="1" height="5" rx=".5"></rect>
        <use xlinkHref="#C" x="-12"></use>
        <rect x="37" width="1" height="5" rx=".5"></rect>
        <use xlinkHref="#C" x="-24"></use>
        <rect x="25" width="1" height="5" rx=".5"></rect>
        <use xlinkHref="#C" x="-36"></use>
        <rect x="13" width="1" height="5" rx=".5"></rect>
      </g>
      <defs>
        <path
          id="C"
          d="M47 .5a.5.5 0 0 1 .5-.5h0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h0a.5.5 0 0 1-.5-.5v-4z"
        ></path>
      </defs>
    </svg>
  );
};

export default CalendarIcon;
