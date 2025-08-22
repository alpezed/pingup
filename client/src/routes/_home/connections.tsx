import { createFileRoute } from "@tanstack/react-router";
import { UserCheck, UserPlus, UserRoundPen, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Connection } from "@/types/user.type";
import { Connections } from "./-components/connection";

export const Route = createFileRoute("/_home/connections")({
  component: Connection,
});

function Followers() {
  return <div>Followers Component</div>;
}

function Following() {
  return <div>Following Component</div>;
}

const connectionsTabs = [
  {
    value: "follower",
    label: "Followers",
    icon: Users,
    component: <Followers />,
  },
  {
    value: "following",
    label: "Following",
    icon: UserCheck,
    component: <Following />,
  },
  {
    value: "pending",
    label: "Pending",
    icon: UserRoundPen,
    component: <Connections status="pending" />,
  },
  {
    value: "connections",
    label: "Connections",
    icon: UserPlus,
    component: <Connections status="accepted" />,
  },
] as const;

function Connection() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Connections</h1>
        <p className="text-slate-600">
          Manage your network and discover new connections
        </p>
      </div>
      <div className="flex gap-6 mb-8">
        {connectionsTabs.map((tab) => (
          <div className="shadow-md w-40 h-20 flex flex-col items-center justify-center text-base rounded-md border border-slate-200/60 bg-white/80">
            <div className="text-black">2</div>
            <div className="text-slate-600">{tab.label}</div>
          </div>
        ))}
      </div>
      <ConnectionTabs />
    </div>
  );
}

function ConnectionTabs() {
  return (
    <Tabs defaultValue={connectionsTabs.at(0)?.value} className="w-full gap-6">
      <TabsList className="shadow-md py-1 text-base rounded-md border border-slate-200/60 bg-white/80">
        {connectionsTabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex border-0 text-base font-normal cursor-pointer items-center transition gap-1 h-7 data-[state=active]:text-black active:text-black hover:text-black px-3 text-slate-500 !shadow-none"
          >
            <Users size={16} />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {connectionsTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
