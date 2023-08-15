import Colors from "@/assets/theme/colors";
import { PlusIcon } from "@heroicons/react/20/solid";
import { MdMenu } from "react-icons/md";
import React from "react";

function MoreBtn() {
  return (
    <div
      onClick={() => {}}
      className="justify-center items-center rounded-sm"
      style={{ backgroundColor: Colors.orange }}
    >
      <div className="text-white items-center hover:cursor-pointer">
        <MdMenu className="h-3 w-3 m-3" />
      </div>
    </div>
  );
}

export default MoreBtn;
