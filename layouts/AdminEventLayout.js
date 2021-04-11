import { Heading, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import EventProvider, { useEvent } from "~/contexts/EventProvider";
import AdminLayout from "./AdminLayout";

const tabs = [
    { name: "Organizations", route: "orgs" },
    { name: "Teams", route: "teams" },
    { name: "Students", route: "students" },
    { name: "Tests", route: "tests" },
    { name: "Event Details", route: "settings" },
];

const AdminEventLayout = ({ children }) => {
    const { data: event } = useEvent();

    const router = useRouter();
    const { entityId, eventId } = router.query;
    const routename = router.pathname.split("/");
    const index = tabs.findIndex(x => routename.includes(x.route));

    return (
        <Stack spacing={6} flex={1} minWidth={0}>
            <Heading>{event.name}</Heading>
            <Tabs index={index} onChange={i => router.push(`/admin/${entityId}/${eventId}/${tabs[i].route}`)}>
                <TabList>
                    {tabs.map(x => (
                        <Tab key={x.route}>{x.name}</Tab>
                    ))}
                </TabList>
            </Tabs>
            {children}
        </Stack>
    );
};

const AdminEventLayoutWrapper = ({ children }) => (
    <AdminLayout>
        <EventProvider>
            <AdminEventLayout>{children}</AdminEventLayout>
        </EventProvider>
    </AdminLayout>
);

export default AdminEventLayoutWrapper;
