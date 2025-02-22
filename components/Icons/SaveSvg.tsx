export const SaveSvgLeft = ({
  fill = "#fd8f04",
  height = "24",
}: {
  fill?: string;
  height?: string;
}) => {
  return (
    <svg
      width="4"
      height={height}
      viewBox="0 0 4 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.65992 3L0 6L2.65992 9L0 12L2.65992 15L0 18L2.65992 21L0 24H3.5V0H0L2.65992 3Z"
        fill={fill}
      ></path>
    </svg>
  );
};

export const SaveSvgRight = ({
  fill = "#fd8f04",
  height = "24",
}: {
  fill?: string;
  height?: string;
}) => {
  return (
    <svg
      width="4"
      height={height}
      viewBox="0 0 4 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.65992 3L0 6L2.65992 9L0 12L2.65992 15L0 18L2.65992 21L0 24H3.5V0H0L2.65992 3Z"
        fill={fill}
        transform="scale(-1,1) translate(-4,0)"
      ></path>
    </svg>
  );
};
