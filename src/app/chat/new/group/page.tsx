
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Check, User, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserProfile } from '@/lib/chat-data';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

const allUserIds = ['2', '3', '5'];
const allUsers = allUserIds.map(id => getUserProfile(id)).filter(Boolean);

export default function NewGroupPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName || selectedUsers.length === 0) return;
    
    // In a real app, you would use this data to create a group on your backend.
    console.log({
      groupName,
      image: imagePreview,
      members: selectedUsers,
    });
    
    // For now, we'll just redirect to the chat list.
    router.push('/chat');
  };

  const filteredUsers = allUsers.filter(user => 
    user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedUserProfiles = selectedUsers.map(id => allUsers.find(u => u?.id === id));

  return (
    <div className="flex flex-col h-full bg-background absolute inset-0 z-30 md:relative md:border-l">
      <header className="flex items-center p-3 border-b shrink-0 bg-background sticky top-0">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Nouveau groupe</h2>
        </div>
      </header>

      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
                {imagePreview ? (
                    <AvatarImage src={imagePreview} alt={groupName} />
                ) : (
                    <AvatarFallback className="text-3xl">
                        <User />
                    </AvatarFallback>
                )}
            </Avatar>
             <Button 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full h-7 w-7"
                onClick={() => imageInputRef.current?.click()}
             >
                <Camera className="h-4 w-4" />
            </Button>
            <input 
                type="file" 
                ref={imageInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
            />
          </div>
          <Input 
            placeholder="Nom du groupe" 
            className="text-lg" 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Rechercher des contacts..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {selectedUsers.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">MEMBRES SÉLECTIONNÉS</h3>
            <div className="flex flex-wrap gap-2">
                {selectedUserProfiles.map(user => user && (
                    <div key={`selected-${user.id}`} className="flex items-center gap-2 bg-secondary p-1 rounded-full">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{user.name}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => toggleUserSelection(user.id)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">CONTACTS</h3>
          <div className="space-y-1">
            {filteredUsers.map(user => user && (
              <div 
                key={user.id} 
                className="flex items-center p-2 rounded-md hover:bg-secondary cursor-pointer"
                onClick={() => toggleUserSelection(user.id)}
              >
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold flex-grow">{user.name}</p>
                <Checkbox checked={selectedUsers.includes(user.id)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedUsers.length > 0 && (
        <footer className="p-4 border-t shrink-0">
          <Button 
            size="lg" 
            className="w-full bg-accent hover:bg-accent/90"
            onClick={handleCreateGroup}
            disabled={!groupName}
          >
            <Check className="mr-2 h-5 w-5" />
            Créer le groupe ({selectedUsers.length} membres)
          </Button>
        </footer>
      )}
    </div>
  );
}
