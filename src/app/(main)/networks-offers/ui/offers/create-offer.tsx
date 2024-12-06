"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pickaxe } from "lucide-react";
import useSWR from "swr";
import axios from "axios";
import CardLayout from "@/components/shared-ui/layouts/card-layout";
import Platforms from "./platforms-list";
import { Label } from "react-aria-components";
import SelectedAffiliateAccount from "./selected-affiliate-account";
import { Input } from "@/components/ui/input";

type Platform = {
  id: string;
  name: string;
  type: string;
  website: string;
};

type Account = {
  username: string;
  id: string;
};
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const CreateOffer = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: plafroms, error } = useSWR(
    `http://localhost:8080/affiliate-network/platforms`,
    fetcher
  ) as { data: Platform[]; error: any };

  const [selectedPlatform, setSelectedPlatform] = React.useState<string | null>(
    null
  );

  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(
    null
  );

  const [campaignId, setCampaignId] = React.useState<string>("");

  const fetchAccounts = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/affiliate-network/platform/${selectedPlatform}/accounts`
    );
    setAccounts(data);
    console.log(data);
  };

  const handleAccountSelect = (account: string) => {
    setSelectedAccount(account);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (!selectedAccount) {
        console.log("Please select an account");
        return;
      }
      // need to send the :x-affiliate-account-key header
      const response = await fetch(
        `http://localhost:8080/offer/get-offer-from-api?campaign-id=${campaignId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-affiliate-account-key": selectedAccount,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("An error occurred while saving the offer.");
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (selectedPlatform) {
      fetchAccounts();
    }
  }, [selectedPlatform]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <Pickaxe
            className=" hover:text-primary transition-all ease-in-out duration-300"
            size={17}
          />
          Create Offer
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Get Offer From Affiliate Network</SheetTitle>
          <SheetDescription>
            You can get the offer from the affiliate network by providing the
            offer
          </SheetDescription>
          <div className="overflow-y-auto w-full mt-10 px-2">
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-2 gap-6 w-full">
                <CardLayout className=" p-2 flex flex-col gap-4 justify-start items-start h-[22rem]">
                  <Label
                    className="text-sm font-medium text-gray-600"
                    htmlFor="platforms"
                  >
                    Select Platform
                  </Label>

                  <Platforms
                    onPlatformSelect={(platform) =>
                      setSelectedPlatform(platform)
                    }
                    platforms={plafroms}
                  />
                </CardLayout>

                <CardLayout className=" p-2 flex w-full flex-col gap-4 justify-start items-start h-[22rem]">
                  <Label
                    className="text-sm font-medium text-gray-600"
                    htmlFor="accounts"
                  >
                    Select Account
                  </Label>
                  <div className="w-full">
                    <SelectedAffiliateAccount
                      onAccountSelect={handleAccountSelect}
                      accounts={accounts}
                    />
                  </div>
                </CardLayout>
              </div>

              <CardLayout className=" p-2 flex w-full flex-col gap-4 justify-start items-start h-[22rem]">
                <Label
                  className="text-sm font-medium text-gray-600"
                  htmlFor="campaign_id"
                >
                  Campaign ID
                </Label>

                <Input
                  id="campaign_id"
                  name="campaign_id"
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  className="w-full p-2 border border-input rounded-lg"
                />
              </CardLayout>
            </div>
            <div className="flex justify-end gap-4">
              <Button
              disabled={isLoading}
              onClick={handleSave}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button>Cancel</Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CreateOffer;
