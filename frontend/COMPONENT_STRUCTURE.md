# 📁 Struktur Komponen Pool - Visual Overview

## Komponen yang Dibuat

### 🔵 Pool Detail Page Komponen

```
app/pool/[address]/page.tsx (REFACTORED)
│
├── BuyPolicyTab.tsx
│   └── Menampilkan list policies yang tersedia
│       Props: policies[], onJoinPool()
│
├── MyDashboardTab.tsx (Container)
│   ├── MembershipStatus.tsx
│   │   └── Display member info + countdown
│   │
│   └── ClaimForm.tsx
│       └── Form submit claim
│
└── GovernanceTab.tsx (Container)
    ├── PendingClaim.tsx (Loop)
    │   └── Single claim card + voting
    │
    └── ClaimHistory.tsx
        └── Resolved claims display
```

### 🟢 Admin Page Komponen

```
app/pool/[address]/admin/page.tsx (REFACTORED)
│
├── PoolStats.tsx
│   └── Display: Balance, Members, Policies, Claims
│
├── PoolInfo.tsx
│   └── Display: Owner, Address, Solvency Status
│
└── CreatePolicyForm.tsx
    └── Form: Name, Duration, Price + Guidelines
```

---

## 📊 File Comparison

### SEBELUM (Monolithic)
```
❌ app/pool/[address]/page.tsx     → 384 baris (semua logic + UI)
❌ app/pool/[address]/admin/page.tsx → 223 baris (semua logic + UI)
❌ components/pool/PoolCard.tsx     → 1 komponen saja
─────────────────────────────────────
TOTAL: 2 pages + 1 komponen = Sulit di-maintain
```

### SESUDAH (Modular)
```
✅ app/pool/[address]/page.tsx      → ~70 baris (hanya orchestration)
✅ app/pool/[address]/admin/page.tsx → ~50 baris (hanya orchestration)
✅ components/pool/
   ├── PoolCard.tsx                 (existing)
   ├── BuyPolicyTab.tsx             (NEW)
   ├── MyDashboardTab.tsx           (NEW)
   ├── GovernanceTab.tsx            (NEW)
   ├── MembershipStatus.tsx         (NEW)
   ├── ClaimForm.tsx                (NEW)
   ├── PendingClaim.tsx             (NEW)
   ├── ClaimHistory.tsx             (NEW)
   ├── PoolStats.tsx                (NEW)
   ├── PoolInfo.tsx                 (NEW)
   └── CreatePolicyForm.tsx         (NEW)
─────────────────────────────────────
TOTAL: 2 pages + 11 komponen = Easy to maintain, test, extend
```

---

## 🔄 Data Flow

### Pool Detail Page

```
                    PoolDetail (Main Page)
                          │
                ┌─────────┼─────────┐
                │         │         │
                ▼         ▼         ▼
            Tab A      Tab B      Tab C
              │          │          │
         BuyPolicy  Dashboard  Governance
         TabTab                  Tab
              │          │          │
         ┌────┘      ┌────┴────┐  ┌──┴────────┐
         │           │         │  │           │
         ▼           ▼         ▼  ▼           ▼
    [Policy]   Member      Claim  Pending  Claim
    Cards      Status      Form   Claims   History
```

### Event Handling

```
BuyPolicyTab
└─► onJoinPool(policyId)
    └─► PoolDetail.handleJoinPool()

ClaimForm
└─► onSubmit(description, photoUrl)
    └─► MyDashboardTab.onSubmitClaim()
        └─► PoolDetail.handleSubmitClaim()

PendingClaim
├─► onVoteYes(claimId)
│   └─► GovernanceTab.onVoteYes()
│       └─► PoolDetail.handleVote(claimId, true)
│
└─► onVoteNo(claimId)
    └─► GovernanceTab.onVoteNo()
        └─► PoolDetail.handleVote(claimId, false)
```

---

## 🎯 Props Interface

### BuyPolicyTab
```typescript
interface BuyPolicyTabProps {
    policies: Policy[];
    onJoinPool: (policyId: number) => void;
}
```

### MyDashboardTab
```typescript
interface MyDashboardTabProps {
    isMember: boolean;
    member: Member;
    onSubmitClaim: (description: string, photoUrl: string) => void;
}
```

### MembershipStatus
```typescript
interface MembershipStatusProps {
    member: Member;
}
```

### ClaimForm
```typescript
interface ClaimFormProps {
    onSubmit: (description: string, photoUrl: string) => void;
}
```

### GovernanceTab
```typescript
interface GovernanceTabProps {
    claims: Claim[];
    onVoteYes: (claimId: number) => void;
    onVoteNo: (claimId: number) => void;
}
```

### PendingClaim
```typescript
interface PendingClaimProps {
    claim: Claim;
    onVoteYes: (claimId: number) => void;
    onVoteNo: (claimId: number) => void;
}
```

### ClaimHistory
```typescript
interface ClaimHistoryProps {
    claims: Claim[];
}
```

### PoolStats
```typescript
interface PoolStatsProps {
    balance: string;
    totalMembers: number;
    activePolicies: number;
    totalClaims: number;
}
```

### PoolInfo
```typescript
interface PoolInfoProps {
    owner: string;
    poolAddress: string;
    solvencyStatus: 'Solvent' | 'At Risk' | 'Insolvent';
}
```

### CreatePolicyForm
```typescript
interface CreatePolicyFormProps {
    poolName: string;
    onSubmit: (formData: PolicyFormData) => Promise<void>;
}
```

---

## ✅ Struktur Minimal

Setiap komponen hanya terdiri dari:
- 📝 Props interface
- 🎨 JSX/UI
- ❌ NO internal state (except form states)
- ❌ NO business logic (kecuali form handling)

Semua orchestration dan state management → **Page Component**

---

## 🚀 Keuntungan Struktur Ini

| Keuntungan | Penjelasan |
|-----------|-----------|
| **Reusability** | Komponen bisa dipakai di page/context lain |
| **Testability** | Mudah untuk unit test dengan props yang jelas |
| **Maintainability** | Perubahan di 1 komponen tidak affect yang lain |
| **Readability** | Kode page jadi sangat bersih dan mudah dipahami |
| **Scalability** | Mudah untuk add fitur baru tanpa mengubah existing |
| **Type Safety** | TypeScript interfaces untuk semua props |
| **Single Responsibility** | 1 komponen = 1 tanggung jawab |

---

## 📝 Contoh: Menambah Fitur Baru

### Skenario: Tambah "Pool Rules" di admin page

**Step 1: Buat komponen baru**
```tsx
// components/pool/PoolRules.tsx
export default function PoolRules({ rules }) {
    return (
        <Card hover={false}>
            <h3 className="text-xl font-bold mb-4">Pool Rules</h3>
            <ul className="space-y-2">
                {rules.map(rule => (
                    <li key={rule.id}>{rule.description}</li>
                ))}
            </ul>
        </Card>
    );
}
```

**Step 2: Update admin page**
```tsx
import PoolRules from '@/components/pool/PoolRules';

export default function AdminPage() {
    return (
        <div>
            <PoolStats ... />
            <PoolInfo ... />
            <PoolRules rules={poolRules} />  {/* NEW */}
            <CreatePolicyForm ... />
        </div>
    );
}
```

**Done!** Sangat simple dan clean! ✨

---

## 🎓 Design Patterns Digunakan

1. **Container & Presentational Pattern**
   - Container: MyDashboardTab, GovernanceTab (orchestration)
   - Presentational: MembershipStatus, ClaimForm, etc. (UI only)

2. **Composition Pattern**
   - Components dicompose dari sub-components
   - Minimal prop drilling

3. **Callback Pattern**
   - Child → Parent communication via callbacks
   - Clean event handling

4. **Separation of Concerns**
   - UI terpisah dari logic
   - State management terpusat di page

---

**Status: ✅ COMPLETE**

Refactoring selesai! Frontend sekarang menerapkan **modular architecture** dengan benar.
