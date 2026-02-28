import React, { ReactNode } from "react";

interface OrderedListProps {
  instructions: ReactNode;
}

const OrderedList: React.FC<OrderedListProps> = ({ instructions }) => {
    // Ensure instructions is an array, wrapping in an array if it's not
  const instructionsArray = React.Children.toArray(instructions);
  return (
    <ol className="list-none space-y-6">
      {instructionsArray.map((instruction, index) => (
        <li key={index} className="flex space-x-6 mb-2 items-center">
          <div className="border-2 border-black rounded-full size-6 phone:size-4 text-lg phone:text-sm flex items-center justify-center flex-shrink-0">
            {index + 1}
          </div>
          <div className="text-xs tablet:text-sm laptop:text-lg">{instruction}</div>
        </li>
      ))}
    </ol>
  );
};

export default OrderedList;
