export const Switcher = ({ isToggled, onToggle }) => {
  return (
    <label className="relative box-border  w-12 h-6 ">
      <input
        type="checkbox"
        className="peer hidden"
        checked={isToggled}
        onChange={onToggle}
      />
      <span
        className="absolute box-border border-1 border-secondary h-6 cursor-pointer rounded-full border bg-white dark:bg-whiteDark inset-0
          before:absolute before:content-[''] before:-left-[1px] before:-top-[1px] before:w-6 before:h-6 before:bg-secondary dark:before:bg-primaryDark before:rounded-full before:border-0
          peer-checked:before:translate-x-6
        "
      />
    </label>
  );
};
