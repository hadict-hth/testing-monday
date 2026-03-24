import React, { useState, useMemo } from 'react';
import { 
  Plus, MoreHorizontal, MessageSquare, UserCircle2, Calendar,
  ChevronDown, Search, Filter, ArrowRightLeft, X, Clock, AlignLeft,
  Mail, Lock, User
} from 'lucide-react';

// --- Configuration & Mock Data ---
const STATUS_OPTIONS = {
  doing: { label: 'Doing', color: 'bg-yellow-400 text-yellow-900' },
  done: { label: 'Done', color: 'bg-green-500 text-white' },
  pending: { label: 'Pending', color: 'bg-blue-400 text-white' },
  cancel: { label: 'Cancel', color: 'bg-gray-400 text-white' },
  empty: { label: '', color: 'bg-gray-200 text-gray-800' }
};

const INITIAL_BOARD = {
  id: 'b1',
  title: 'Web Development Project',
  groups: [
    {
      id: 'g1',
      title: 'Sprint 1: Foundation',
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500',
      tasks: [
        { id: 't1', name: 'Design database schema', details: 'Need EAV model for custom columns', person: 'Alex M.', status: 'done', date: '2026-03-20', time: '14:00' },
        { id: 't2', name: 'Setup authentication', details: '', person: 'Sarah J.', status: 'doing', date: '2026-03-24', time: '10:00' },
        { id: 't3', name: 'Build dynamic grid', details: 'React window for virtualization?', person: 'System Admin', status: 'pending', date: '2026-03-26', time: '17:00' },
      ]
    },
    {
      id: 'g2',
      title: 'Sprint 2: Features',
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      borderColor: 'border-purple-500',
      tasks: [
        { id: 't4', name: 'Implement WebSockets', details: '', person: 'Alex M.', status: 'pending', date: '2026-04-02', time: '' },
        { id: 't5', name: 'User roles & permissions', details: 'Admin, Editor, Viewer', person: '', status: 'empty', date: '', time: '' },
      ]
    }
  ]
};

// --- Helper Components ---
const StatusCell = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentStatus = STATUS_OPTIONS[status] || STATUS_OPTIONS.empty;

  return (
    <div className="relative w-full h-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full flex items-center justify-center cursor-pointer transition-all hover:opacity-80 ${currentStatus.color}`}
      >
        <span className="text-sm font-medium fold-bold shadow-sm">{currentStatus.label}</span>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 shadow-xl rounded-md z-50 overflow-hidden">
          {Object.entries(STATUS_OPTIONS).map(([key, value]) => (
            key !== 'empty' && (
              <div 
                key={key}
                onClick={() => { onChange(key); setIsOpen(false); }}
                className={`w-full p-2 text-center cursor-pointer hover:opacity-90 transition-opacity ${value.color}`}
              >
                {value.label}
              </div>
            )
          ))}
          <div 
            onClick={() => { onChange('empty'); setIsOpen(false); }}
            className="w-full p-2 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            Clear
          </div>
        </div>
      )}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

// --- AUTHENTICATION SCREEN ---
const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mô phỏng logic Auth: Nếu là đăng nhập, dùng tạm một tên mặc định nếu chưa nhập.
    const userName = isLogin ? (formData.email.split('@')[0] || 'User') : formData.name;
    onLogin({ name: userName, email: formData.email });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Đăng nhập vào Workspace' : 'Tạo tài khoản mới'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Hoặc ' : 'Đã có tài khoản? '}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            {isLogin ? 'đăng ký tài khoản miễn phí' : 'đăng nhập ngay'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ và Tên (PIC Name)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password" required
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isLogin ? 'Đăng nhập' : 'Đăng ký & Bắt đầu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Main App (Workspace) ---
const Workspace = ({ currentUser, onLogout }) => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  
  // -- UI State --
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // -- Data Processing State --
  const [filters, setFilters] = useState({ statuses: [], pics: [], endingSoon: false });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // -- Modal State --
  const [modalConfig, setModalConfig] = useState({ isOpen: false, groupId: null });
  // Mặc định gán người đang đăng nhập làm PIC cho task mới
  const [newItem, setNewItem] = useState({ name: '', details: '', person: currentUser.name, status: 'pending', date: '', time: '' });

  // --- Core Logic: Search, Filter, Sort Engine ---
  const processedGroups = useMemo(() => {
    return board.groups.map(group => {
      let tasks = [...group.tasks];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        tasks = tasks.filter(t => 
          t.name.toLowerCase().includes(query) || 
          (t.person && t.person.toLowerCase().includes(query)) ||
          (t.date && t.date.includes(query))
        );
      }

      if (filters.statuses.length > 0) {
        tasks = tasks.filter(t => filters.statuses.includes(t.status));
      }
      if (filters.pics.length > 0) {
        tasks = tasks.filter(t => filters.pics.includes(t.person));
      }
      if (filters.endingSoon) {
        const today = new Date();
        const threeDaysFromNow = new Date(today);
        threeDaysFromNow.setDate(today.getDate() + 3);
        
        tasks = tasks.filter(t => {
          if (!t.date) return false;
          const taskDate = new Date(t.date);
          return taskDate >= today && taskDate <= threeDaysFromNow && t.status !== 'done' && t.status !== 'cancel';
        });
      }

      if (sortConfig.key) {
        tasks.sort((a, b) => {
          let valA = a[sortConfig.key] || '';
          let valB = b[sortConfig.key] || '';
          
          if (sortConfig.key === 'date') {
            valA = valA ? new Date(valA).getTime() : 0;
            valB = valB ? new Date(valB).getTime() : 0;
          }

          if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
          if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }

      return { ...group, tasks };
    });
  }, [board, searchQuery, filters, sortConfig]);

  // --- Handlers ---
  const handleStatusChange = (groupId, taskId, newStatus) => {
    setBoard(prev => ({
      ...prev,
      groups: prev.groups.map(g => g.id === groupId 
        ? { ...g, tasks: g.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t) } 
        : g
      )
    }));
  };

  const openNewTaskModal = (groupId) => {
    // Reset form, luôn để mặc định PIC là current user
    setNewItem({ name: '', details: '', person: currentUser.name, status: 'pending', date: '', time: '' });
    setModalConfig({ isOpen: true, groupId });
  };

  const handleSaveNewItem = () => {
    if (!newItem.name.trim()) return;
    
    const taskToSave = {
      id: `new-${Date.now()}`,
      ...newItem
    };

    setBoard(prev => ({
      ...prev,
      groups: prev.groups.map(g => g.id === modalConfig.groupId 
        ? { ...g, tasks: [...g.tasks, taskToSave] } 
        : g
      )
    }));

    setModalConfig({ isOpen: false, groupId: null });
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value) ? current.filter(i => i !== value) : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        return { key: null, direction: 'asc' }; // cycle off
      }
      return { key, direction: 'asc' };
    });
  };

  const uniquePics = Array.from(new Set(board.groups.flatMap(g => g.tasks.map(t => t.person)).filter(Boolean)));
  // Lấy ký tự đầu của tên để làm Avatar
  const avatarLetter = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Workspaces</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-gray-600 mr-2">Xin chào, {currentUser.name}</div>
          <div 
            onClick={onLogout}
            className="w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-semibold cursor-pointer transition-colors"
            title="Đăng xuất"
          >
            {avatarLetter}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-x-auto relative">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-3xl font-semibold">{board.title}</h2>
            <div className="flex items-center space-x-3 text-sm relative">
              
              <button 
                onClick={() => openNewTaskModal(board.groups[0].id)}
                className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                New Item <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search tasks, people, dates..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                  className={`flex items-center px-3 py-1.5 rounded transition-colors ${filters.statuses.length || filters.pics.length || filters.endingSoon ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </button>
                
                {isFilterOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-30 p-4">
                    <h4 className="font-semibold mb-2 text-xs text-gray-500 uppercase">Status</h4>
                    <div className="space-y-1 mb-4">
                      {Object.entries(STATUS_OPTIONS).map(([k, v]) => k !== 'empty' && (
                        <label key={k} className="flex items-center space-x-2 cursor-pointer text-sm">
                          <input type="checkbox" checked={filters.statuses.includes(k)} onChange={() => toggleFilter('statuses', k)} className="rounded text-blue-600"/>
                          <span>{v.label}</span>
                        </label>
                      ))}
                    </div>
                    <h4 className="font-semibold mb-2 text-xs text-gray-500 uppercase">People (PIC)</h4>
                    <div className="space-y-1 mb-4">
                      {uniquePics.map(pic => (
                        <label key={pic} className="flex items-center space-x-2 cursor-pointer text-sm">
                          <input type="checkbox" checked={filters.pics.includes(pic)} onChange={() => toggleFilter('pics', pic)} className="rounded text-blue-600"/>
                          <span>{pic}</span>
                        </label>
                      ))}
                    </div>
                    <h4 className="font-semibold mb-2 text-xs text-gray-500 uppercase">Smart Filters</h4>
                    <label className="flex items-center space-x-2 cursor-pointer text-sm text-red-600 font-medium">
                      <input type="checkbox" checked={filters.endingSoon} onChange={() => setFilters(p => ({...p, endingSoon: !p.endingSoon}))} className="rounded text-red-600"/>
                      <span>Ending Soon (Next 3 Days)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                  className={`flex items-center px-3 py-1.5 rounded transition-colors ${sortConfig.key ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  <ArrowRightLeft className="w-4 h-4 mr-2" /> Sort {sortConfig.key && `(${sortConfig.key})`}
                </button>
                {isSortOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-2">
                    {['name', 'person', 'status', 'date'].map(key => (
                      <div 
                        key={key} 
                        onClick={() => handleSort(key)}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center text-sm capitalize"
                      >
                        {key}
                        {sortConfig.key === key && (
                          <span className="text-blue-600 text-xs">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Groups Rendering */}
          <div className="space-y-8">
            {processedGroups.map(group => (
              <div key={group.id} className="flex flex-col">
                {/* Group Header */}
                <div className="flex items-center mb-2 group-hover:opacity-100">
                  <div className="flex items-center w-[400px]">
                    <ChevronDown className={`w-5 h-5 mr-1 ${group.textColor} cursor-pointer`} />
                    <h3 className={`text-lg font-medium ${group.textColor}`}>{group.title}</h3>
                  </div>
                  <div className="flex-1 flex text-gray-400 text-sm pl-4 border-b border-gray-200 pb-1">
                    <div className="w-32 text-center">Person</div>
                    <div className="w-40 text-center border-l border-gray-200">Status</div>
                    <div className="w-48 text-center border-l border-gray-200">Timeline</div>
                    <div className="w-12 text-center border-l border-gray-200 flex justify-center"></div>
                  </div>
                </div>

                {/* Tasks Table */}
                <div className="border border-gray-200 bg-white rounded-md shadow-sm overflow-hidden">
                  {group.tasks.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">No items match criteria.</div>
                  ) : group.tasks.map((task, index) => (
                    <div key={task.id} className={`flex items-stretch border-b border-gray-100 hover:bg-slate-50 group/row transition-colors border-l-4 ${index === 0 ? group.borderColor : 'border-transparent'}`}>
                      <div className={`w-1.5 ${group.color} opacity-0 group-hover/row:opacity-100 transition-opacity`} />
                      
                      {/* Name & Details Column */}
                      <div className="w-[400px] flex items-center px-4 py-2 border-r border-gray-100 bg-white">
                        <div className="flex-1">
                          <input type="text" defaultValue={task.name} className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 font-medium" />
                          {task.details && (
                            <div className="px-1 text-xs text-gray-500 flex items-center mt-0.5 truncate max-w-[350px]">
                              <AlignLeft className="w-3 h-3 mr-1 inline" /> {task.details}
                            </div>
                          )}
                        </div>
                        <MessageSquare className="w-4 h-4 text-gray-300 hover:text-blue-500 cursor-pointer ml-2 opacity-0 group-hover/row:opacity-100" />
                      </div>

                      {/* Person Column */}
                      <div className="w-32 flex items-center justify-center border-r border-gray-100 bg-white">
                        {task.person ? (
                          <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded-full px-2">
                            <UserCircle2 className="w-5 h-5 text-gray-400" />
                            <span className="text-sm truncate max-w-[80px]">{task.person}</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400">
                            <UserCircle2 className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Status Column */}
                      <div className="w-40 border-r border-gray-100 p-0.5 bg-gray-50/50">
                        <StatusCell status={task.status} onChange={(s) => handleStatusChange(group.id, task.id, s)} />
                      </div>

                      {/* Date + Time Column */}
                      <div className="w-48 flex items-center justify-center border-r border-gray-100 bg-white cursor-pointer hover:bg-gray-50 px-2 space-x-2">
                        {task.date ? (
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {task.date}
                            {task.time && <><Clock className="w-3.5 h-3.5 ml-3 mr-1 text-gray-400"/> {task.time}</>}
                          </div>
                        ) : (
                          <Calendar className="w-4 h-4 text-gray-300 opacity-0 group-hover/row:opacity-100 transition-opacity" />
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="w-12 bg-white flex items-center justify-center opacity-0 group-hover/row:opacity-100">
                         <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-700"/>
                      </div>
                    </div>
                  ))}
                  
                  {/* Inline Add Task */}
                  <div 
                    onClick={() => openNewTaskModal(group.id)}
                    className="flex items-center px-6 py-2 bg-gray-50 text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="text-sm">Add Item</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- Global Overlays --- */}
      {(isFilterOpen || isSortOpen) && (
        <div className="fixed inset-0 z-20" onClick={() => { setIsFilterOpen(false); setIsSortOpen(false); }} />
      )}

      {/* --- New Item Modal --- */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-semibold">Create New Task</h2>
              <button onClick={() => setModalConfig({ isOpen: false, groupId: null })} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Task Name *</label>
                <input 
                  type="text" autoFocus
                  value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Update Landing Page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details & Notes</label>
                <textarea 
                  rows={3}
                  value={newItem.details} onChange={e => setNewItem({...newItem, details: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Add scope, instructions, or links..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person in Charge (PIC)</label>
                  <div className="relative">
                    <UserCircle2 className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="text" 
                      value={newItem.person} onChange={e => setNewItem({...newItem, person: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                      placeholder="e.g., Alex M."
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tự động điền theo tài khoản</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
                  <select 
                    value={newItem.status} onChange={e => setNewItem({...newItem, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {Object.entries(STATUS_OPTIONS).map(([k, v]) => k !== 'empty' && (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                    <option value="empty">Empty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="date" 
                      value={newItem.date} onChange={e => setNewItem({...newItem, date: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time (Optional)</label>
                  <div className="relative">
                    <Clock className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="time" 
                      value={newItem.time} onChange={e => setNewItem({...newItem, time: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
              <button 
                onClick={() => setModalConfig({ isOpen: false, groupId: null })}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveNewItem}
                disabled={!newItem.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Wrapper ---
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <AuthScreen onLogin={setCurrentUser} />;
  }

  return <Workspace currentUser={currentUser} onLogout={() => setCurrentUser(null)} />;
}
