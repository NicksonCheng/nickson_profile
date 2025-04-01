"use client";
import * as React from "react";
import { TopMenuBar } from "./TopMenuBar";
import { SideNavigation } from "./SideNavigation";
import { MainContent } from "./MainContent";

export const EditorLayout: React.FC = () => {
  return (
    <div className="flex w-screen h-screen bg-white">
      <div className="flex flex-col w-full">
        <TopMenuBar />
        <div className="flex flex-1">
          <SideNavigation />
          <div className="flex bg-zinc-800 border-[1px_solid_#494949] w-[179px]" />
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
