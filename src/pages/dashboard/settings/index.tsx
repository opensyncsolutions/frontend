import { useTranslations } from "@/shared/hooks/use-translations";
import PageTemplate from "@/templates/page-template";
import { Card } from "@/components/ui/card";
import ProfileSettings from "./profile-settings";
import { Separator } from "@/components/ui/separator";
import AccountSetting from "./account-settings";

const Settings = () => {
  const { translate } = useTranslations();

  return (
    <PageTemplate
      title={translate("Settings")}
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: translate("Settings"),
        },
      ]}
    >
      <Card>
        <ProfileSettings />
        <div className="px-[24px]">
          <Separator />
        </div>
        <AccountSetting />
      </Card>
    </PageTemplate>
  );
};

export default Settings;
