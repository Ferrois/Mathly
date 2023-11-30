"use client";

import "katex/dist/katex.min.css";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Topic/Tabs";
import TopicWrapper from "@/components/Topic/TopicWrapper";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BlockMath } from "react-katex";
import Divider from "@/components/Topic/Divider";

const tabs = ["Vectors", "Lines", "Planes"];

export default function Topic() {
  const { data: session } = useSession();
  const [tab, setTab] = useState(tabs[0]);
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
      <Navbar />
      {/* <h1>Vectors</h1>
      <p>Hi {session?.user?.email}</p> */}
      {/* {JSON.stringify(session)} */}
      <TopicWrapper>
        <Tabs onChange={setTab} tabs={tabs} value={tab} />
        <Vectors />
      </TopicWrapper>
    </div>
  );
}

function Vectors() {
  const length1 = "\\overrightarrow{a} = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}";
  const length2 = "|\\overrightarrow{a}| = \\sqrt{x^2 + y^2 + z^2}";
  const add1 = "\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA}";
  const unit1 = "\\text{\\^{a}} = \\text{\\(\\frac a {|a|} \\)}";
  const scalar1 = "\\text{a} \\sdot \\text{b} = \\text{b} \\sdot \\text{a}"
  const scalar2 = "\\text{a} \\sdot (\\text{b} \\plusmn \\text{c}) = \\text{a} \\sdot \\text{b} \\plusmn \\text{a} \\sdot \\text{c}"
  const scalar3 = ""
  const scalar4 = ""
  return (
    <div>
      <h3 className="text-xl m-3 font-bold">Length of vector</h3>
      <BlockMath>{length1}</BlockMath>
      <BlockMath>{length2}</BlockMath>
      <Divider />
      <h3 className="text-xl m-3 font-bold">Addition property</h3>
      <BlockMath>{add1}</BlockMath>
      <Divider />
      <h3 className="text-xl m-3 font-bold">Unit Vector</h3>
      <BlockMath>{unit1}</BlockMath>
      <Divider />
      <h3 className="text-xl m-3 font-bold">Scalar Product</h3>
      <BlockMath>{scalar1}</BlockMath>
      <BlockMath>{scalar2}</BlockMath>
      <BlockMath>{scalar3}</BlockMath>
      <BlockMath>{scalar4}</BlockMath>

    </div>
  );
}
