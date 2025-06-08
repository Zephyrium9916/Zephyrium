import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setStatus(data.message)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-2xl shadow-xl bg-white mt-10">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" required className="w-full p-2 border rounded" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded" value={form.email} onChange={handleChange} />
        <textarea name="message" placeholder="Your message" required className="w-full p-2 border rounded" value={form.message} onChange={handleChange} />
        <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 rounded">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {status && <p className="text-sm mt-2 text-center text-gray-600">{status}</p>}
      </form>
    </div>
  )
}
