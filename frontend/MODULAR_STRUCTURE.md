# Struktur Modular Frontend - Parisure Pool Pages

## 📋 Analisis Masalah Sebelumnya

File `pool/[address]/page.tsx` **TIDAK menerapkan modular** dengan benar:
- ❌ Semua tab content (Buy Policy, My Dashboard, Governance) digabung dalam satu file (384 baris)
- ❌ Claim voting, membership status, form submission inline (tidak reusable)
- ❌ Logic kompleks tercampur dengan JSX (sulit untuk test dan maintain)
- ❌ Duplicate code untuk rendering claims dan voting

Masalah yang sama ditemukan di `pool/[address]/admin/page.tsx`:
- ❌ Form creation logic dan UI tercampur
- ❌ Statistics dan pool info tidak terpisah
- ❌ Sulit untuk reuse komponen di page lain

---

## ✅ Solusi Modular

### Struktur Komponen Pool Detail Page

```
components/pool/
├── BuyPolicyTab.tsx         # Tab untuk membeli policy
├── MyDashboardTab.tsx       # Tab dashboard member
├── GovernanceTab.tsx        # Tab voting claims
├── MembershipStatus.tsx     # Status membership detail
├── ClaimForm.tsx            # Form submit claim
├── PendingClaim.tsx         # Card claim pending
└── ClaimHistory.tsx         # List claim history
```

### Struktur Komponen Admin Page

```
components/pool/
├── PoolStats.tsx            # Statistik pool
├── PoolInfo.tsx             # Informasi pool
└── CreatePolicyForm.tsx     # Form buat policy
```

---

## 🔧 Detail Setiap Komponen

### 1. **BuyPolicyTab.tsx**
**Tujuan:** Menampilkan list policy yang tersedia

**Props:**
```typescript
interface BuyPolicyTabProps {
    policies: Policy[];
    onJoinPool: (policyId: number) => void;
}
```

**Keunggulan:**
- ✅ Standalone dan reusable
- ✅ Single responsibility (hanya menampilkan policies)
- ✅ Callback untuk handling join pool
- ✅ Mudah untuk testing

---

### 2. **MembershipStatus.tsx**
**Tujuan:** Menampilkan status keanggotaan dan countdown

**Props:**
```typescript
interface MembershipStatusProps {
    member: Member;
}
```

**Keunggulan:**
- ✅ Terpisah dari dashboard logic
- ✅ Bisa di-reuse di berbagai konteks
- ✅ Hanya menangani display data

---

### 3. **ClaimForm.tsx**
**Tujuan:** Form untuk submit claim

**Props:**
```typescript
interface ClaimFormProps {
    onSubmit: (description: string, photoUrl: string) => void;
}
```

**Keunggulan:**
- ✅ Menangani state input internal (description, photoUrl)
- ✅ Callback onSubmit untuk parent component
- ✅ Form validation built-in
- ✅ Reusable di multiple pages

---

### 4. **PendingClaim.tsx**
**Tujuan:** Menampilkan single pending claim dengan voting

**Props:**
```typescript
interface PendingClaimProps {
    claim: Claim;
    onVoteYes: (claimId: number) => void;
    onVoteNo: (claimId: number) => void;
}
```

**Keunggulan:**
- ✅ Vote progress calculation internal
- ✅ Mudah untuk list rendering
- ✅ Callbacks terpisah untuk yes/no votes

---

### 5. **ClaimHistory.tsx**
**Tujuan:** Menampilkan history claims yang sudah di-resolve

**Props:**
```typescript
interface ClaimHistoryProps {
    claims: Claim[];
}
```

**Keunggulan:**
- ✅ Filter logic internal (tidak pending)
- ✅ Display only, no interaction needed
- ✅ Bisa di-reuse

---

### 6. **MyDashboardTab.tsx**
**Tujuan:** Container untuk dashboard member

**Props:**
```typescript
interface MyDashboardTabProps {
    isMember: boolean;
    member: Member;
    onSubmitClaim: (description: string, photoUrl: string) => void;
}
```

**Struktur:**
```jsx
{isMember ? (
    <>
        <MembershipStatus member={member} />
        <ClaimForm onSubmit={onSubmitClaim} />
    </>
) : (
    <NotMemberCard />
)}
```

**Keunggulan:**
- ✅ Compose child components (MembershipStatus + ClaimForm)
- ✅ Conditional rendering berdasarkan member status
- ✅ Callback propagation ke child components

---

### 7. **GovernanceTab.tsx**
**Tujuan:** Container untuk governance/voting

**Props:**
```typescript
interface GovernanceTabProps {
    claims: Claim[];
    onVoteYes: (claimId: number) => void;
    onVoteNo: (claimId: number) => void;
}
```

**Struktur:**
```jsx
<>
    <PendingClaims>
        {pendingClaims.map(claim => (
            <PendingClaim key={claim.id} {...props} />
        ))}
    </PendingClaims>
    <ClaimHistory claims={claims} />
</>
```

**Keunggulan:**
- ✅ Compose 2 sub-komponen
- ✅ Bersihkan filtering logic di sini
- ✅ Props drilling minimal

---

### 8. **PoolStats.tsx**
**Tujuan:** Menampilkan statistik pool (admin page)

**Props:**
```typescript
interface PoolStatsProps {
    balance: string;
    totalMembers: number;
    activePolicies: number;
    totalClaims: number;
}
```

**Keunggulan:**
- ✅ Pure presentational component
- ✅ Reusable di berbagai pages
- ✅ Mudah untuk styling/branding

---

### 9. **PoolInfo.tsx**
**Tujuan:** Menampilkan info pool detail (admin page)

**Props:**
```typescript
interface PoolInfoProps {
    owner: string;
    poolAddress: string;
    solvencyStatus: 'Solvent' | 'At Risk' | 'Insolvent';
}
```

**Keunggulan:**
- ✅ Dynamic solvency status styling
- ✅ Reusable component
- ✅ Extensible untuk fields baru

---

### 10. **CreatePolicyForm.tsx**
**Tujuan:** Form untuk create policy (admin page)

**Props:**
```typescript
interface CreatePolicyFormProps {
    poolName: string;
    onSubmit: (formData: PolicyFormData) => Promise<void>;
}
```

**Keunggulan:**
- ✅ Internal form state management (useForm hook)
- ✅ Loading state handling
- ✅ Async submit dengan error handling
- ✅ Form reset setelah submit
- ✅ Policy guidelines inline

---

## 🎯 Refactored Page Components

### **pool/[address]/page.tsx**
```tsx
export default function PoolDetail() {
    const [isMember] = useState(true);
    
    // Data fetching
    const pool = getPoolByAddress(address);
    const policies = getPoliciesForPool(address);

    // Event handlers
    const handleJoinPool = (policyId) => { ... };
    const handleSubmitClaim = (description, photoUrl) => { ... };
    const handleVote = (claimId, vote) => { ... };

    // Tab components (using child components)
    const buyPolicyTab = <BuyPolicyTab policies={policies} onJoinPool={handleJoinPool} />;
    const myDashboardTab = <MyDashboardTab isMember={isMember} member={mockMember} onSubmitClaim={handleSubmitClaim} />;
    const governanceTab = <GovernanceTab claims={mockClaims} onVoteYes={...} onVoteNo={...} />;

    return (
        <div>
            <Tabs tabs={[buyPolicyTab, myDashboardTab, governanceTab]} />
        </div>
    );
}
```

**Keunggulan Refactor:**
- ✅ Dari 384 baris → ~70 baris (81% reduction)
- ✅ Fokus pada logic dan composition
- ✅ Mudah untuk test
- ✅ Easy to read dan maintain

---

### **pool/[address]/admin/page.tsx**
```tsx
export default function AdminPage() {
    const handleCreatePolicy = async (formData) => {
        // Submit logic
    };

    return (
        <div>
            <div className="grid md:grid-cols-2">
                <PoolStats balance="12.5 ETH" totalMembers={47} ... />
                <PoolInfo owner={pool.owner} poolAddress={pool.poolAddress} ... />
            </div>
            <CreatePolicyForm poolName={pool.name} onSubmit={handleCreatePolicy} />
        </div>
    );
}
```

**Keunggulan Refactor:**
- ✅ Dari 223 baris → ~50 baris (78% reduction)
- ✅ Very clear structure
- ✅ Komponen-komponen dapat di-reuse

---

## 📊 Comparison Before vs After

| Aspek | Before | After |
|-------|--------|-------|
| Pool Detail Page | 384 baris | ~70 baris |
| Admin Page | 223 baris | ~50 baris |
| Reusable Components | 0 | 10 |
| Testability | ❌ Hard | ✅ Easy |
| Maintainability | ❌ Low | ✅ High |
| Code Duplication | ❌ Yes | ✅ No |
| Component Composition | ❌ No | ✅ Yes |

---

## 🚀 Best Practices Diterapkan

1. **Single Responsibility Principle**
   - Setiap komponen punya 1 tanggung jawab
   - Contoh: `PendingClaim` hanya untuk display 1 claim

2. **Composition Pattern**
   - Tab components menggunakan child components
   - Parent component fokus pada orchestration

3. **Props Drilling Minimized**
   - Callbacks langsung ke handler functions
   - Props drilling hanya 1-2 level

4. **Reusability**
   - Semua sub-komponen bisa di-reuse
   - `MembershipStatus` bisa di-pakai di profile page
   - `PoolStats` bisa di-pakai di dashboard

5. **Type Safety**
   - Interface untuk setiap komponen
   - Props validation dengan TypeScript

6. **Separation of Concerns**
   - UI terpisah dari logic
   - Form state management isolated
   - Event handling di parent level

---

## 📝 Cara Menggunakan Komponen

### Contoh: Tambah fitur baru

Jika ingin tambah fitur "Pool History" di admin page:

```tsx
// 1. Buat komponen baru
// components/pool/PoolHistory.tsx
export default function PoolHistory({ transactions }) { ... }

// 2. Update admin page
import PoolHistory from '@/components/pool/PoolHistory';

export default function AdminPage() {
    return (
        <>
            <PoolStats ... />
            <PoolHistory transactions={poolTransactions} />
        </>
    );
}
```

**No JSX pollution, clean composition!**

---

## ✨ Summary

Refactoring ini mengubah frontend dari **monolithic pages** menjadi **modular, composable components**. Setiap komponen punya:
- ✅ Clear responsibility
- ✅ Reusable interface
- ✅ Type-safe props
- ✅ Testable behavior
- ✅ Easy to extend

Struktur ini siap untuk scaling dan menambah fitur baru dengan mudah! 🎉
