"use client";

import React, { useEffect, useRef } from "react";
import * as go from "gojs";

const StructureSchema = ({ data }: any) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, (diagramRef as any).current, {
      layout: $(go.LayeredDigraphLayout, {
        direction: 90, // Vertikal yo'nalish
        layerSpacing: 150, // Vertikal qatorlar orasidagi masofa
        columnSpacing: 60, // Gorizontal tugunlar orasidagi masofa
      }),
      initialContentAlignment: go.Spot.Center, // Markazlash
      isReadOnly: true,
      allowVerticalScroll: true,
      padding: 20,
      allowZoom: false,
    });

    // Node shabloni
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        click: (e, obj: any) => {
          const node = obj.part.data;
          if (node.link) {
            const anchor = document.createElement("a");
            anchor.href = node.link;
            anchor.target = "_blank";
            anchor.click();
          }
        },
        movable: false,
      },
      $(go.Shape, "RoundedRectangle", {
        fill: "#ffffff",
        stroke: "#163781",
        strokeWidth: 2,
        width: 300,
        height: 100,
      }),
      $(
        go.TextBlock,
        {
          margin: 10,
          font: "bold 15px Arial, sans-serif",
          stroke: "#000000",
          textAlign: "center",
          wrap: go.TextBlock.WrapFit,
          overflow: go.TextBlock.OverflowEllipsis,
          maxSize: new go.Size(280, NaN),
          editable: false,
        },
        new go.Binding("text", "name"),
      ),
    );

    // Link shabloni
    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.AvoidsNodes, // Tugunlar ustidan chiqmaslik uchun
        corner: 5, // Burchaklarni yumshatish
        selectable: false,
        fromSpot: go.Spot.Bottom, // Chiziq pastdan boshlanadi
        toSpot: go.Spot.Top, // Chiziq tepa tomonda tugaydi
      },
      $(go.Shape, { strokeWidth: 2, stroke: "#9E9E9E" }),
      $(go.Shape, { toArrow: "Standard", fill: "#9E9E9E" }),
    );

    const validatedData = data.map((item: any) => ({
      ...item,
      parent: item.parent || undefined,
    }));

    // Diagramga ma'lumot ulash
    diagram.model = $(go.TreeModel, {
      nodeDataArray: validatedData,
    });

    return () => {
      diagram.div = null;
    };
  }, [data]);

  return (
    <div className="relative">
      <div
        ref={diagramRef}
        style={{
          width: "100%",
          height: "150vh",
          border: "1px solid lightgray",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
};

export default StructureSchema;
