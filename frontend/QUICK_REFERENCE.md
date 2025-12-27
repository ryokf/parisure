# 🏗️ Modular Architecture - Quick Reference Guide

## 📋 Komponen di Pool Detail Page

### 🔵 **BuyPolicyTab.tsx**
Menampilkan list policies yang tersedia

**Props:**
- `policies: Policy[]` - List of available policies
- `onJoinPool: (policyId: number) => void` - Callback when user clicks join

**Contoh Penggunaan:**
```tsx
<BuyPolicyTab 
  policies={policies} 
  onJoinPool={handleJoinPool} 
/>
```

---

### 🟢 **MyDashboardTab.tsx** (Container)
Container untuk dashboard member

**Props:**
- `isMember: boolean` - Member status
- `member: Member` - Member data
- `onSubmitClaim: (description, photoUrl) => void` - Callback when claim submitted

**Struktur Internal:**
```
MyDashboardTab
├── if (isMember)
│   ├── MembershipStatus
│   └── ClaimForm
└── else
    └── NotMemberCard
```

---

### 🟣 **GovernanceTab.tsx** (Container)
Container untuk voting & claim history

**Props:**
- `claims: Claim[]` - All claims
- `onVoteYes: (claimId) => void` - Vote yes callback
- `onVoteNo: (claimId) => void` - Vote no callback

**Struktur Internal:**
```
GovernanceTab
├── Pending Claims Section
│   └── PendingClaim[] (looping)
└── Claim History Section
    └── ClaimHistory
```

---

### 🟡 **MembershipStatus.tsx**
Menampilkan status keanggotaan + countdown

**Props:**
```typescript
interface MembershipStatusProps {
    member: {
        isActive: boolean;
        joinedAt: string;
        expiredDate: string;
    };
}
```

**Display:**
- Status badge (Active/Expired)
- Joined date
- Expiration date  
- Countdown timer

---

### 🔴 **ClaimForm.tsx**
Form untuk submit claim

**Props:**
```typescript
interface ClaimFormProps {
    onSubmit: (description: string, photoUrl: string) => void;
}
```

**Internal State:**
- `claimDescription` - Input field value
- `claimPhotoUrl` - IPFS URL input

**Form Fields:**
- Description (textarea)
- Photo URL (text input)
- Submit button

---

### 🟠 **PendingClaim.tsx**
Single pending claim card dengan voting buttons

**Props:**
```typescript
interface PendingClaimProps {
    claim: Claim;
    onVoteYes: (claimId: number) => void;
    onVoteNo: (claimId: number) => void;
}
```

**Display:**
- Claim photo
- Claimant address
- Description
- Vote progress bar
- Yes/No vote buttons

---

### 🟤 **ClaimHistory.tsx**
List of resolved claims

**Props:**
```typescript
interface ClaimHistoryProps {
    claims: Claim[];
}
```

**Internal Logic:**
- Filter: only non-pending claims
- Display: read-only cards
- Status: Accepted/Rejected badge

---

## 📋 Komponen di Admin Page

### 📊 **PoolStats.tsx**
Display pool statistics

**Props:**
```typescript
interface PoolStatsProps {
    balance: string;        // "12.5 ETH"
    totalMembers: number;   // 47
    activePolicies: number; // 3
    totalClaims: number;    // 8
}
```

**Display:**
- Pool balance (green)
- Total members
- Active policies
- Total claims

---

### ℹ️ **PoolInfo.tsx**
Display pool information

**Props:**
```typescript
interface PoolInfoProps {
    owner: string;
    poolAddress: string;
    solvencyStatus: 'Solvent' | 'At Risk' | 'Insolvent';
}
```

**Display:**
- Owner address (purple)
- Pool address (cyan)
- Solvency status (color-coded)

---

### ✅ **CreatePolicyForm.tsx**
Form untuk create new policy

**Props:**
```typescript
interface CreatePolicyFormProps {
    poolName: string;
    onSubmit: (formData: PolicyFormData) => Promise<void>;
}
```

**Internal State:**
- `isActive` - Checkbox state
- `isLoading` - Async submit state
- Form state via `useForm` hook

**Form Fields:**
- Policy name
- Duration (days)
- Price (ETH)
- Active checkbox
- Policy guidelines (info box)
- Submit button

---

## 🔄 Data Flow Summary

### Pool Detail Page
```
User Interaction
    ↓
{handleJoinPool, handleSubmitClaim, handleVote}
    ↓
├→ BuyPolicyTab.onJoinPool()
├→ MyDashboardTab.onSubmitClaim()
└→ GovernanceTab.onVoteYes/No()
    ↓
Update UI / Alert
```

### Admin Page
```
User Fills Form
    ↓
CreatePolicyForm.onSubmit()
    ↓
handleCreatePolicy()
    ↓
Alert + Clear Form
```

---

## 🎯 Import Statements

### Pool Detail Page
```tsx
import BuyPolicyTab from '@/components/pool/BuyPolicyTab';
import MyDashboardTab from '@/components/pool/MyDashboardTab';
import GovernanceTab from '@/components/pool/GovernanceTab';
```

### MyDashboardTab Uses
```tsx
import MembershipStatus from '@/components/pool/MembershipStatus';
import ClaimForm from '@/components/pool/ClaimForm';
```

### GovernanceTab Uses
```tsx
import PendingClaim from '@/components/pool/PendingClaim';
import ClaimHistory from '@/components/pool/ClaimHistory';
```

### Admin Page
```tsx
import PoolStats from '@/components/pool/PoolStats';
import PoolInfo from '@/components/pool/PoolInfo';
import CreatePolicyForm from '@/components/pool/CreatePolicyForm';
```

---

## 🚀 Usage Examples

### Basic: Pool Detail Page
```tsx
export default function PoolDetail() {
    const [isMember] = useState(true);
    const handleJoinPool = (id) => alert(`Joined ${id}`);
    const handleSubmitClaim = (desc, photo) => alert('Claim submitted');
    const handleVote = (id, vote) => alert(`Voted ${vote}`);

    return (
        <div>
            <Tabs tabs={[
                {
                    label: 'Buy Policy',
                    content: (
                        <BuyPolicyTab 
                            policies={policies}
                            onJoinPool={handleJoinPool}
                        />
                    )
                },
                {
                    label: 'My Dashboard',
                    content: (
                        <MyDashboardTab
                            isMember={isMember}
                            member={mockMember}
                            onSubmitClaim={handleSubmitClaim}
                        />
                    )
                },
                {
                    label: 'Governance',
                    content: (
                        <GovernanceTab
                            claims={mockClaims}
                            onVoteYes={(id) => handleVote(id, true)}
                            onVoteNo={(id) => handleVote(id, false)}
                        />
                    )
                }
            ]} />
        </div>
    );
}
```

### Basic: Admin Page
```tsx
export default function AdminPage() {
    const handleCreatePolicy = async (formData) => {
        alert('Policy created!');
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <PoolStats
                balance="12.5 ETH"
                totalMembers={47}
                activePolicies={3}
                totalClaims={8}
            />
            <PoolInfo
                owner={pool.owner}
                poolAddress={pool.poolAddress}
                solvencyStatus="Solvent"
            />
            <CreatePolicyForm
                poolName={pool.name}
                onSubmit={handleCreatePolicy}
            />
        </div>
    );
}
```

---

## ✅ Testing Checklist

- [ ] BuyPolicyTab displays all policies
- [ ] BuyPolicyTab disables inactive policies
- [ ] BuyPolicyTab calls onJoinPool with correct ID
- [ ] MembershipStatus shows correct dates
- [ ] MembershipStatus shows correct status badge
- [ ] ClaimForm submits with correct data
- [ ] ClaimForm clears after submit
- [ ] PendingClaim shows vote progress correctly
- [ ] PendingClaim calls vote callbacks
- [ ] GovernanceTab shows pending claims only
- [ ] GovernanceTab shows all history claims
- [ ] PoolStats displays correct numbers
- [ ] PoolInfo displays correct addresses
- [ ] CreatePolicyForm submits correctly
- [ ] CreatePolicyForm resets after submit

---

## 📌 Important Notes

1. **State Management**
   - All state lives in Page components
   - Child components are presentational
   - Callbacks go back to parent

2. **Props Drilling**
   - Minimal (max 1-2 levels)
   - Use composition to reduce drilling

3. **Reusability**
   - Each component works standalone
   - Props interfaces are clear
   - Easy to test independently

4. **Type Safety**
   - All props have TypeScript interfaces
   - Compile-time error checking
   - Better IDE autocomplete

5. **Performance**
   - Components are small
   - Easy to memoize if needed
   - React.memo can be added later

---

## 🎓 Learning Path

1. Start with understanding **Pool Detail Page Structure** (main page)
2. Understand **Container vs Presentational Pattern** (MyDashboardTab, GovernanceTab)
3. Study **Props Interfaces** (how data flows)
4. Learn **Event Callbacks** (how parent receives events)
5. Practice **Composition** (how components fit together)

---

**Quick Links:**
- 📄 [MODULAR_STRUCTURE.md](./MODULAR_STRUCTURE.md) - Full documentation
- 📊 [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) - Visual diagrams
- 🔄 [BEFORE_AFTER.md](./BEFORE_AFTER.md) - Comparison
- 📝 [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Summary

---

**Version:** 1.0  
**Status:** Production Ready ✅  
**Last Updated:** December 27, 2025
