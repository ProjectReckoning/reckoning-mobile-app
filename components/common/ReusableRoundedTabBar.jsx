import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils";
import AppText from "@/components/common/typography/AppText";

/**
 * A reusable, rounded tab bar component that can display a variable number of tabs.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.tabs - An array of tab objects. Each object should have a 'name' and 'label'.
 * @param {string} [props.initialTab] - The name of the tab to be active initially. Defaults to the first tab in the array.
 * @param {function(string): void} [props.onTabChange] - Callback function that is called when the active tab changes.
 * @param {string} [props.activeBackgroundColor='bg-lime-wondr'] - The Tailwind CSS class for the active tab's background color.
 * @param {string} [props.inactiveBackgroundColor='light-gray-wondr'] - The key for the inactive tab's background color from WondrColors.
 * @param {string} [props.activeTextColor='font-extrabold'] - The Tailwind CSS class for the active tab's text style.
 * @param {string} [props.inactiveTextColor='font-normal'] - The Tailwind CSS class for the inactive tab's text style.
 * @param {string} [props.containerClassName] - Additional class names for the main container Box.
 * @returns {JSX.Element}
 */
export default function ReusableRoundedTabBar({
  tabs = [],
  initialTab,
  onTabChange,
  activeBackgroundColor = "bg-lime-wondr",
  inactiveBackgroundColor = "light-gray-wondr",
  activeTextColor = "font-extrabold",
  inactiveTextColor = "font-normal",
  containerClassName = "",
}) {
  const [activeTab, setActiveTab] = useState(
    initialTab || (tabs.length > 0 ? tabs[0].name : null),
  );

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  const TabButton = ({ name, label }) => {
    const isActive = activeTab === name;
    const boxClassName = `py-3 px-4 rounded-full ${isActive ? activeBackgroundColor : ""}`;
    const textClassName = `text-center ${isActive ? activeTextColor : inactiveTextColor}`;

    // Use style prop only for colors that are not part of the standard Tailwind palette.
    const boxStyle = isActive
      ? {}
      : { backgroundColor: WondrColors[inactiveBackgroundColor] };

    return (
      <Pressable onPress={() => handleTabPress(name)} className="flex-1">
        <Box className={boxClassName} style={boxStyle}>
          <AppText
            variant="body"
            className={textClassName}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minFontSize={12}
          >
            {label}
          </AppText>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box
      className={`flex-row items-center justify-between rounded-full mb-4 ${containerClassName}`}
      style={{ backgroundColor: WondrColors[inactiveBackgroundColor] }}
    >
      {tabs.map((tab) => (
        <TabButton key={tab.name} name={tab.name} label={tab.label} />
      ))}
    </Box>
  );
}
