import Template01 from '../components/templates/template-01/Template01'
import Template02 from '../components/templates/template-02/Template02'
import Template03 from '../components/templates/template-03/Template03'
import Template04 from '../components/templates/template-04/Template04'
import Template05 from '../components/templates/template-05/Template05'
import Template06 from '../components/templates/template-06/Template06'
import initialTemplatesData from '../data/templates.json'

/**
 * Registry mapping template IDs to their independent React components.
 * Supports all 6 wedding invitation themes with customized animations and layouts:
 * - Template 01: Royal Parchment & Petals (Ceremonial Door Reveal, Petal Physics)
 * - Template 02: Authentic Temple Mandapam (Gopuram Arch, Kuthuvilakku Flame, Kolams)
 * - Template 03: Pastel Botanical & Floral Romance (Vinyl Audio Disc, Envelope Open, Gift Bank)
 * - Template 04: Western Luxury & Modern Romance (Wax Seal Open, Bio Spotlight, Scripture, Wishes)
 * - Template 05: Midnight Aurora Glassmorphism (Cyber Neon Glass, Stacked Gallery, Attire Guide, FAQs)
 * - Template 06: Royal Taj Heritage & Floral Grandeur (Royal Monogram, Taj Arches, Muhurtham Schedule)
 */
const TEMPLATE_COMPONENTS = {
  'template-01': Template01,
  'template-02': Template02,
  'template-03': Template03,
  'template-04': Template04,
  'template-05': Template05,
  'template-06': Template06,
}

// In-memory registry combining metadata and components
let registeredTemplates = [...initialTemplatesData]

export function getAllTemplates() {
  return registeredTemplates.map((meta) => ({
    ...meta,
    isRegistered: Boolean(TEMPLATE_COMPONENTS[meta.id]),
    component: TEMPLATE_COMPONENTS[meta.id] || null,
  }))
}

export function getTemplateById(templateId) {
  const meta = registeredTemplates.find((t) => t.id === templateId)
  if (!meta) return null
  return {
    ...meta,
    component: TEMPLATE_COMPONENTS[templateId] || null,
  }
}

export function getTemplateComponent(templateId) {
  return TEMPLATE_COMPONENTS[templateId] || TEMPLATE_COMPONENTS['template-01']
}

export function registerTemplate(meta, component) {
  if (!meta || !meta.id) {
    throw new Error('Template registration requires an id')
  }
  if (component) {
    TEMPLATE_COMPONENTS[meta.id] = component
  }
  const existingIdx = registeredTemplates.findIndex((t) => t.id === meta.id)
  if (existingIdx >= 0) {
    registeredTemplates[existingIdx] = { ...registeredTemplates[existingIdx], ...meta }
  } else {
    registeredTemplates.push(meta)
  }
  return getTemplateById(meta.id)
}

export function isTemplateRegistered(templateId) {
  return Boolean(TEMPLATE_COMPONENTS[templateId])
}
