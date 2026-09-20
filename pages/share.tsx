import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { PRODUCT } from '../lib/product'

export default function Share() {
  const [data, setData] = useState<{ q: string; r: string } | null>(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const q = params.get('q')
      if (!q) return setErr('No shared data found in this link.')
      const json = JSON.parse(decodeURIComponent(atob(q)))
      setData(json)
    } catch {
      setErr('Could not read the shared link.')
    }
  }, [])

  return (
    <Layout>
      <Head>
        <title>Shared — {PRODUCT.name}</title>
        <meta name="description" content={`A SQL query shared from ${PRODUCT.name}`} />
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shared from {PRODUCT.name}</h1>
        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {err}
          </div>
        )}
        {data && (
          <div className="bg-white rounded-xl shadow p-6">
            {data.q && (
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Question:</span> {data.q}
              </p>
            )}
            <pre className="whitespace-pre-wrap text-gray-700 text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
              {data.r}
            </pre>
          </div>
        )}
        <p className="text-center text-sm text-gray-400 mt-6">
          <a href="/" className="text-brand hover:opacity-80">Generate your own →</a>
        </p>
      </div>
    </Layout>
  )
}
