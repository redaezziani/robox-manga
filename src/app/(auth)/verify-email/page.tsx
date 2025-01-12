'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('جاري التحقق من بريدك الإلكتروني...');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('رمز التحقق غير صالح أو مفقود');
        return;
      }

      try {
        await axios.post(
          'http://localhost:8000/api/v1/auth/verify-email',
          {
            verificationToken: token
          },
          {
            headers: {
              'Content-Type': 'application/json',
              accept: '*/*',
            },
          }
        );
        
        setStatus('success');
        setMessage('تم التحقق من بريدك الإلكتروني بنجاح!');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage( 
          'حدث خطأ أثناء التحقق من بريدك الإلكتروني. يرجى المحاولة مرة أخرى.'
        );
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="size-12 animate-spin text-primary" />
            <p className="text-center text-lg text-gray-600">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <Alert className="bg-green-50 text-green-900">
            <AlertTitle className="text-lg font-semibold">
              تم التحقق بنجاح!
            </AlertTitle>
            <AlertDescription className="mt-2">
              {message}
              <div className="mt-4">
                جاري تحويلك إلى صفحة تسجيل الدخول...
              </div>
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTitle className="text-lg font-semibold">
                فشل التحقق
              </AlertTitle>
              <AlertDescription className="mt-2">
                {message}
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/register')}
              >
                العودة للتسجيل
              </Button>
              <Button
                onClick={() => router.push('/login')}
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;