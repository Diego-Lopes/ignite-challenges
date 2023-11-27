import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { env } from '@/env'
import { Metadata } from 'next'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'
// converte html em image o ImageResponse

interface ProductProps {
  params: {
    slug: string
  }
}

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  // passando controle de cache como objeto em api.
  /**
   * cache: permite nós fazermos contrele de cache da requisição.
   */
  const response = await api(`/products/${slug}`, {
    next: {
      // isso é um cache
      revalidate: 60 * 60, // 1h
    },
  })

  const products = await response.json()

  return products
}

// Image generation
export default async function OgImage({ params }: ProductProps) {
  const product = await getProduct(params.slug)

  // construindo uma url completa pois estamos pegando da pasta public, e metadados só aceito urls completas.
  const productImageUrl = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
