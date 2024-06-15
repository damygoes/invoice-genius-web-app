import AddNewSubscriptionButton from "@/components/subscription-management/AddNewSubscriptionButton";
import DeleteSubscriptionItemModal from "@/components/subscription-management/DeleteSubscriptionItemModal";
import SubscriptionList from "@/components/subscription-management/SubscriptionList";
import { useSubscriptionManagementStore } from "./utils/useSubscription";

const SubscriptionManagementService = () => {
  const { isDeleteSubscriptionModalOpen } = useSubscriptionManagementStore();

  return (
    <section className="flex flex-col items-start justify-start w-full h-full p-4 gap-7">
      <AddNewSubscriptionButton />
      <SubscriptionList />
      {isDeleteSubscriptionModalOpen && <DeleteSubscriptionItemModal />}
    </section>
  );
};

export default SubscriptionManagementService;
