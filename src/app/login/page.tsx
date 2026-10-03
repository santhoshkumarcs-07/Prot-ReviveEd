'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Student, ChalkboardTeacher, UsersThree, ArrowRight } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ROLES = [
  { id: 'student', title: 'Student', desc: 'Dive into interactive learning experiences', icon: Student, color: 'text-[var(--color-amber)]', bg: 'bg-[var(--color-amber)]/10', href: '/home' },
  { id: 'teacher', title: 'Teacher', desc: 'Monitor progress and assign tasks', icon: ChalkboardTeacher, color: 'text-[var(--color-teal)]', bg: 'bg-[var(--color-teal)]/10', href: '/teacher/dashboard' },
  { id: 'parent', title: 'Parent', desc: 'View reports and encourage learning', icon: UsersThree, color: 'text-[var(--color-violet)]', bg: 'bg-[var(--color-violet)]/10', href: '/parent/dashboard' }
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-display text-4xl lg:text-5xl text-[var(--color-ink)] mb-4">
            Welcome to ReviveEd
          </h1>
          <p className="text-body mx-auto text-[var(--color-gray-500)] text-lg">
            Choose your role to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedRole(role.id)}
              >
                <Card 
                  variant="outlined" 
                  hoverable 
                  padding="lg" 
                  className={`cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-[var(--color-amber)] shadow-[var(--shadow-xl)] scale-105' : 'border-transparent'}`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto ${role.bg}`}>
                    <Icon size={40} weight="duotone" className={role.color} />
                  </div>
                  <h3 className="text-heading text-2xl text-center mb-3">{role.title}</h3>
                  <p className="text-sm text-[var(--color-gray-500)] text-center mb-8 h-10">{role.desc}</p>
                  
                  <div className="flex justify-center">
                    <Link href={role.href} className="w-full" tabIndex={-1}>
                      <Button 
                        variant={isSelected ? 'curiosity' : 'secondary'} 
                        size="lg" 
                        className="w-full"
                        icon={<ArrowRight size={18} weight="bold" />} 
                        iconPosition="right"
                      >
                        Login as {role.title}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
