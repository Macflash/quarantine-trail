import React from 'react';

export const ColorYellow = "rgb(255,247,138)";
export const ColorOrange = "rgb(247,166,48)";
export const ColorBrown = "rgb(178,101,8)";
export const ColorDarkBrown = "rgb(69,20,0)";

export const OuterBorder = `10px ridge ${ColorBrown}`;
export const InnerBorder = `5px solid ${ColorBrown}`;
export const MiniBorder = `1px solid ${ColorDarkBrown}`;

const spacing = 5;
const margin = spacing / 2;

const basicBoxStyle = {
    backgroundColor: ColorYellow,
    margin,
    border: MiniBorder,
}

export const Layout: React.FC = props => {
    return <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", backgroundColor: ColorBrown, height: "100%", padding: margin, border: MiniBorder }}>
        <VerticalMenu />
        <div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ ...basicBoxStyle, flex: "auto" }}>
                {/* TODO: Add main view here! */}

            </div>
            <div style={{ ...basicBoxStyle, flex: "auto" }}>
                {/* TODO: Add Log here! */}
            </div>
        </div>
        <div style={{ ...basicBoxStyle, width: 140 }}></div>
        <VerticalMenu />
    </div>;
}


export const VerticalMenu: React.FC = props => {
    return <div style={{ ...basicBoxStyle, width: 80 }}>
        {/* TODO: Add menu items here! */}
    </div>;
}