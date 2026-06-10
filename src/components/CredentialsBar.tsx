const credentials = [
  { label: "Accreditation", value: "LAM Registered Architect" },
  { label: "Membership",    value: "PAM Corporate Member" },
  { label: "Award",         value: "PAM Silver Award Project" },
  { label: "Experience",    value: "10+ Years" },
  { label: "Location",      value: "Johor Bahru" },
];

const CredentialsBar = () => {
  return (
    <div className="relative w-full bg-[#0a0a0a] border-y border-[#2a2a2a] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      
      {/* 右侧渐变遮罩：暗示右侧有内容可以滚动 */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-[#0a0a0a] z-10 hidden md:block" />

      <div className="flex items-stretch w-max min-w-full justify-start lg:justify-center mx-auto">
        {credentials.map((item, i) => (
          <div
            key={i}
            // 手机端给第一个元素留多一点空间，这样即使不滚动也能看到右边内容的一角
            className={`flex flex-col items-center justify-center px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 ${
              i === 0 ? "pl-8 md:pl-8" : "" 
            } ${
              i < credentials.length - 1 ? "border-r border-[#2e2e2e]" : ""
            }`}
          >
            <span className="font-futura text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-[#888] mb-1.5 md:mb-2">
              {item.label}
            </span>
            <span className="font-futura text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.15em] uppercase text-[#e8e8e8] whitespace-nowrap font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CredentialsBar;