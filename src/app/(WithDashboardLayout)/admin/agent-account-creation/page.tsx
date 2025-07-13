import AgentAccountCreation from '@/components/modules/dashboard/agent-account-creation/page';
import { getAllUsersApi } from '@/service/AuthService';

export default async function getAgentAccount() {
  const res = await getAllUsersApi();

  return (
    <div>
      <AgentAccountCreation agents={res.data} />
    </div>
  );
}
