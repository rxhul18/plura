import React from "react";
import { X } from "lucide-react";
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

export default function CustomEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <>
      <BezierEdge {...props} />
      <path
        d={edgePath}
        fill="none"
        strokeWidth={20}
        stroke="transparent"
        className="react-flow__edge-interaction"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <EdgeLabelRenderer>
        <button
          aria-label="Delete Edge"
          className={`absolute p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          onClick={() =>
            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id))
          }
        >
          <X className={` ${isHovered ? 'opacity-100' : 'opacity-0'} w-4 h-4 text-red-500`} />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
