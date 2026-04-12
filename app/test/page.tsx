"use client";

import React, { useState } from "react";

import LoadingSpinner, { CardSkeleton, ListSkeleton } from "@/components/LoadingSpinner";
import { useToast } from "@/components/Toast";
import Modal, { ModalFooter } from "@/components/Modal";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function TestPage() {
  const toast = useToast();
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  
  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // محاكاة انتظار 2 ثانية
    setIsDeleting(false);
    setIsConfirmOpen(false);
    toast.success("تم الحذف بنجاح!", "لقد تم إزالة العنصر من قاعدة البيانات.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-12">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">لوحة اختبار المكونات 🛠️</h1>
        <p className="text-gray-500 text-sm">جرب كل المكونات اللي ضفتها في مكان واحد</p>
      </header>

      {/* 1. Loading & Skeletons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-l-4 border-blue-500 pl-2">1. التحميل (Loading & Skeletons)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-600">Spinners:</p>
            <div className="flex items-center gap-4">
              <LoadingSpinner size="sm" text="صغير" />
              <LoadingSpinner size="md" color="primary" text="متوسط" />
              <LoadingSpinner size="lg" color="secondary" text="كبير" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-600">Skeletons (قبل ما الداتا تحمل):</p>
            <CardSkeleton />
          </div>
        </div>
      </section>

      {/* 2. Toast Notifications */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-l-4 border-green-500 pl-2">2. التنبيهات (Toast)</h2>
        <div className="flex flex-wrap gap-4 bg-white p-6 rounded-lg shadow-sm">
          <button onClick={() => toast.success("عملية ناجحة", "تم حفظ البيانات!")} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Success</button>
          <button onClick={() => toast.error("خطأ!", "حدثت مشكلة غير متوقعة.")} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Error</button>
          <button onClick={() => toast.info("تنبيه", "هناك تحديث جديد متاح.")} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Info</button>
          <button onClick={() => toast.warning("تحذير", "مساحة التخزين قاربت على الانتهاء.")} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Warning</button>
        </div>
      </section>

      {/* 3. Modal & Dialogs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-l-4 border-purple-500 pl-2">3. النوافذ المنبثقة (Modals)</h2>
        <div className="flex gap-4 bg-white p-6 rounded-lg shadow-sm">
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition">
        
          </button>
          <button onClick={() => setIsConfirmOpen(true)} className="px-6 py-3 bg-red-100 text-red-600 border border-red-200 rounded-lg hover:bg-red-200 transition">
       
          </button>
        </div>
      </section>

  


      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="تفاصيل العنصر"
      >
        <div className="p-4 space-y-3">
          <p className="text-gray-600">دي نافذة Modal احترافية، تقدر تحط فيها فورم (Form) أو أي محتوى تانى.</p>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center border-dashed border-2 text-gray-400">
             Content Area
          </div>
        </div>
        <ModalFooter>
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">إغلاق</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md">حفظ التغييرات</button>
        </ModalFooter>
      </Modal>

      {/* الـ Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="هل أنت متأكد من الحذف؟"
        message="هذا الإجراء لا يمكن التراجع عنه، سيتم مسح كافة البيانات المتعلقة بهذا العنصر."
        confirmText="نعم، احذف الآن"
        cancelText="تراجع"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}