import mongoose from 'mongoose'

export const COLLECTION_NAME = 'restaurants'

export class Restaurant extends mongoose.Schema {
  constructor () {
    super({
      id: {
        type: Number,
        required: false,
        unique: true
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true,
        trim: true
      },
      phone_number: {
        type: String,
        trim: true
      },
      opening_hours: {
        type: [String],
        required: false,
        trim: true,
        default: []
      },
      rating: {
        type: Number,
        required: false
      },
      price_level: {
        type: Number,
        required: false
      },
      location: {
        lat: {
          type: Number,
          required: true
        },
        lng: {
          type: Number,
          required: true
        }
      },
      google_maps_url: {
        type: String,
        required: false,
        trim: true
      },
      icon: {
        type: String,
        required: false,
        trim: true
      },
      website: {
        type: String,
        required: false,
        trim: true
      },
      photo: {
        type: String,
        required: false,
        trim: true
      }
    })
  }
}
