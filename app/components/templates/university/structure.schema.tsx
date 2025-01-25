"use client";

import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import { GraphObject } from "gojs";

interface OrgData {
  key: string | number;
  name: string;
  link?: string;
  parent?: string | number;
}

interface OrgChartProps {
  data: OrgData[];
}

export default function OrgChartPage({ data }: OrgChartProps) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [myDiagram, setMyDiagram] = useState<go.Diagram | null>(null);

  useEffect(() => {
    if (!diagramRef.current) return;

    function init() {
      const $ = go.GraphObject.make;

      const diagram = new go.Diagram((diagramRef as any).current, {
        allowCopy: false,
        allowDelete: false,
        isReadOnly: true,
        initialAutoScale: go.AutoScale.UniformToFill,
        maxSelectionCount: 1,
        validCycle: go.CycleMode.DestinationTree,
        layout: new go.TreeLayout({
          treeStyle: go.TreeStyle.LastParents,
          arrangement: go.TreeArrangement.Horizontal,
          angle: 90,
          layerSpacing: 35,
          alternateAngle: 90,
          alternateLayerSpacing: 35,
          alternateAlignment: go.TreeAlignment.Bus,
          alternateNodeSpacing: 20,
        }),
        "undoManager.isEnabled": true,
      });

      diagram.nodeTemplate = $(
        go.Node,
        go.Panel.Spot,
        {
          isShadowed: true,
          shadowOffset: new go.Point(0, 2),
          selectionObjectName: "BODY",
          click: (e, node: any) => {
            const link = node.data.link;
            if (link) {
              window.open("https://nordicuniversity.org" + link, "_blank");
            }
          },
        },
        $(
          go.Panel,
          go.Panel.Auto,
          { name: "BODY" },
          $(go.Shape, "RoundedRectangle", {
            name: "SHAPE",
            strokeWidth: 0,
            fill: "white",
            portId: "",
            spot1: go.Spot.TopLeft,
            spot2: go.Spot.BottomRight,
          }),
          $(
            go.Panel,
            go.Panel.Table,
            { margin: 0.5, defaultRowSeparatorStrokeWidth: 0.5 },
            $(go.Panel, go.Panel.Table, {
              padding: new go.Margin(18, 18, 18, 24),
            })
              .addColumnDefinition(0, { width: 240 })
              .add(
                $(
                  go.Panel,
                  go.Panel.Table,
                  {
                    column: 0,
                    alignment: go.Spot.Left,
                    stretch: go.Stretch.Vertical,
                    defaultAlignment: go.Spot.Left,
                  },
                  $(
                    go.Panel,
                    go.Panel.Horizontal,
                    { row: 0 },
                    $(
                      go.TextBlock,
                      {
                        editable: false,
                        font: "bold 18px Arial",
                        minSize: new go.Size(10, 14),

                        stroke: "black",
                        maxSize: new go.Size(200, NaN),
                      },
                      new go.Binding("text", "name"),
                    ),
                  ),
                  $(
                    go.TextBlock,
                    {
                      row: 1,
                      editable: false,
                      minSize: new go.Size(10, 14),
                      stroke: "white",
                    },
                    new go.Binding("text", "title"),
                  ),
                ),
              ),
            $(go.Panel, go.Panel.Table, {
              row: 1,
              stretch: go.Stretch.Horizontal,
              defaultColumnSeparatorStrokeWidth: 0.5,
            }),
          ),
        ),
        $(
          go.Shape,
          "RoundedLeftRectangle",
          {
            alignment: go.Spot.Left,
            alignmentFocus: go.Spot.Left,
            stretch: go.Stretch.Vertical,
            width: 6,
            strokeWidth: 0,
          },
          new go.Binding("fill", "", () => "#253f75").ofObject(),
        ),
        $("TreeExpanderButton", {
          _treeExpandedFigure: "LineUp",
          _treeCollapsedFigure: "LineDown",
          name: "BUTTON",
          alignment: go.Spot.Bottom,
          opacity: 0,
        }),
      );

      diagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Link.Orthogonal,
          layerName: "Background",
          corner: 5,
        },
        $(go.Shape, { strokeWidth: 2 }),
      );

      const fixedData = data.map((item) => {
        if (item.parent === null) {
          return { ...item, parent: undefined };
        }
        return item;
      });

      diagram.model = new go.TreeModel(fixedData);

      let lastkey = 1;
      diagram.model.makeUniqueKeyFunction = (model, nd) => {
        let k = nd.key || lastkey;
        while (model.findNodeDataForKey(k)) k++;
        nd.key = k;
        lastkey = k;
        return k;
      };

      setMyDiagram(diagram);
    }

    init();

    return () => {
      if (myDiagram) {
        myDiagram.div = null;
      }
    };
  }, [data]);

  return (
    <div className=" relative" style={{ width: "100%" }}>
      <div
        ref={diagramRef}
        id="myDiagramDiv"
        style={{
          width: "100%",
          height: "100vh",
          border: "1px solid lightgray",
        }}
      ></div>
      <div className="absolute w-48 h-[70px] top-0 z-50 left-0 bg-white"></div>
    </div>
  );
}
