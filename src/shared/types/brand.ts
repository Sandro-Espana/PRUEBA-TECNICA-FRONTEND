export interface Brand {
  id: string
  name: string
  registration_number: string
  country: string
  registration_date: string
  status: "active" | "pending" | "inactive"
  monitored_platforms: string
  can_enforce: boolean
  authority_collaboration: string
  last_monitoring_date: string
  evidence_link: string
  createdAt?: string
}

export interface CreateBrandRequest {
  name: string
  registration_number: string
  country: string
  registration_date: string
  status: Brand["status"]
  monitored_platforms: string
  can_enforce: boolean
  authority_collaboration: string
  last_monitoring_date: string
  evidence_link: string
}

export interface UpdateBrandRequest {
  status?: "active" | "pending" | "inactive"
  monitored_platforms?: string
  can_enforce?: boolean
  authority_collaboration?: string
  last_monitoring_date?: string
  evidence_link?: string
}
